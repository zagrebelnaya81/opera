<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Setting;
use App\Transformers\SettingTransformer;
use App\Http\Controllers\Controller;

class SettingController extends Controller
{
    public function index() {
        $slugs = [
            'facebook',
            'twitter',
            'instagram',
            'youtube',
            'current_season',
        ];
        $settings = Setting::with('translate')
            ->whereIn('slug', $slugs)
            ->get();

        return fractal()
            ->collection($settings)
            ->transformWith(new SettingTransformer)
            ->toArray();
    }
}
