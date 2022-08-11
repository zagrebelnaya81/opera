<?php

use Faker\Generator as Faker;

$factory->defineAs(\App\Models\Commission::class, 'commission', function (Faker $faker) {
  return [
    'size' => 1,
  ];
});

$factory->defineAs(\App\Models\CommissionTranslation::class, 'commission_en', function (Faker $faker) {
  return [
    'commission_id' => 1,
    'language' => 'en',
    'title' => 'Commission name',
  ];
});

$factory->defineAs(\App\Models\CommissionTranslation::class, 'commission_ru', function (Faker $faker) {
    return [
        'commission_id' => 1,
        'language' => 'ru',
        'title' => 'Commission name',
    ];
});

$factory->defineAs(\App\Models\CommissionTranslation::class, 'commission_ua', function (Faker $faker) {
    return [
        'commission_id' => 1,
        'language' => 'ua',
        'title' => 'Commission name',
    ];
});
