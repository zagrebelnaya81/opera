<?php

use Illuminate\Database\Seeder;

class CommissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Models\Commission::class, 'commission', 2)->create()->each(function($commission) {
            $commission->translate('en')->save(factory(\App\Models\CommissionTranslation::class, 'commission_en')->make());
            $commission->translate('ru')->save(factory(\App\Models\CommissionTranslation::class, 'commission_ru')->make());
            $commission->translate('ua')->save(factory(\App\Models\CommissionTranslation::class, 'commission_ua')->make());
        });
    }
}
