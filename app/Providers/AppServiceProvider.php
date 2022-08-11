<?php

namespace App\Providers;

use anlutro\LaravelSettings\Facade as Setting;
use App\Models\Partner;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Blade;


use Cache;

class AppServiceProvider extends ServiceProvider
{
    public const CACHE_TIME = 60;

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        App::setLocale('ua');

        Blade::directive('set', function ($exp) {
            list($name, $val) = explode(',', $exp);
            return "<?php $name = $val ?>";
        });

        Cache::forget('mainPartners');

        if (Schema::hasTable('partners')) {
            Cache::remember('mainPartners', self::CACHE_TIME, function () {
                return Partner::with('translate', 'category', 'category.translate', 'media')->where('is_active', 1)->where('is_main', 1)->limit(1)->get();
            });
            Cache::remember('partners', self::CACHE_TIME, function () {
                return Partner::with('translate', 'category', 'category.translate', 'media')->where('is_active', 1)->where('in_footer', 1)->get();
            });
        }

        if (Schema::hasTable('settings')) {
            $settings = \App\Models\Setting::get();

            foreach ($settings as $setting) {
                foreach (get_languages() as $key => $lang) {
                    Setting::set($key . '.' . $setting->slug, $setting->translate($key)->first()->title);
                }
            }
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
