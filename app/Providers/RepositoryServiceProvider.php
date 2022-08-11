<?php

namespace App\Providers;

use App\Repositories\Contracts\ReportConstructorRepositoryContract;
use App\Repositories\Contracts\ReportRepositoryContract;
use App\Repositories\ReportConstructorRepository;
use App\Repositories\ReportRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider{

    public function register(){

        $this->app->bind(
            ReportRepositoryContract::class,
            ReportRepository::class,
            ReportConstructorRepositoryContract::class,
            ReportConstructorRepository::class
        );

    }

}