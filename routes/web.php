<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Models\Distributor;
use App\Models\PerformanceCalendar;
use App\Models\User;
use function foo\func;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

Auth::routes();

Route::get('user/{param?}/{param2?}/{param3?}', function () {
    return view('layouts.user');
})->name('front.user.index');;

Route::get('ticket/{param?}/{param2?}/{param3?}', function () {
    return view('layouts.ticket');
})->name('front.ticket.index');

Route::group(['prefix' => '', 'middleware' => ['front'], 'throttle:2,60'], function () {
    Route::get('', 'SiteController@index')->name('front.home');
    Route::get('search', function () {
        return view('pages.theatre.pages.search');
    })->name('front.page.search');
    Route::get('calendar', 'CalendarController@index')->name('front.calendar.index');
    Route::get('repertoire', 'EventController@index')->name('front.events.index');
    Route::get('events/{id}-{slug}', 'EventController@show')->name('front.events.show');
    Route::get('events-date/{performanceCalendar}', 'EventDateController@show')->name('front.events-date.show');
    Route::get('synopsis/{id}-{slug}', 'EventController@synopsis')->name('front.events.synopsis');
    Route::group(['prefix' => 'team'], function () {
        Route::get('artistic-management', 'ActorController@artistic_management')->name('front.team.artistic-management');
        Route::get('management', 'ActorController@management')->name('front.team.management');
        Route::get('directors', 'ActorController@directors')->name('front.team.directors');
        Route::get('conductors', 'ActorController@conductors')->name('front.team.conductors');
        Route::get('artists', 'ActorController@artists')->name('front.team.artists');
        Route::get('invited-artists', 'ActorController@invited_artists')->name('front.team.invited-artists');
        Route::get('invited-artists/{subgroup?}', 'ActorController@invited_artists')->name('front.team.invited-artists');
        Route::get('art-directors/{subgroup?}', 'ActorController@art_directors')->name('front.team.art-directors');
        Route::get('production-part/{subgroup?}', 'ActorController@production_part')->name('front.team.production-part');
        Route::get('operation-part/{subgroup?}', 'ActorController@operation_part')->name('front.team.operation-part');

        //diregory
        Route::get('diregor', 'ActorController@diregor')->name('front.team.diregor');

        // Route::get('artists-part', 'ActorController@artists_part')->name('front.team.artists-part');
        // Route::get('artists-part/{subgroup?}', 'ActorController@artists_part')->name('front.team.artists-part');
        // Route::get('artists-part-artists/{subgroup?}', 'ActorController@artists_part_artists')->name('front.team.artists-part-artists');
        // Route::get('artists-part-product/{subgroup?}', 'ActorController@artists_part_product')->name('front.team.artists-part-product');
        // Route::get('artists-part-operation/{subgroup?}', 'ActorController@artists_part_operation_part')->name('front.team.artists-part-operation');

        Route::group(['prefix' => 'artistspart'], function () {
            Route::get('', function () {
                return redirect(route('front.team.artistspart.artistspart-artists'));
            })->name('front.team.artistspart');
            Route::get('artistspart-artists', 'ActorController@artistspart_artists')->name('front.team.artistspart.artistspart-artists');
            Route::get('artistspart-operation', 'ActorController@artistspart_operation')->name('front.team.artistspart.artistspart-operation');
            Route::get('artistspart-product', 'ActorController@artistspart_product')->name('front.team.artistspart.artistspart-product');
        });
        Route::group(['prefix' => 'troupe'], function () {
            Route::get('', function () {
                return redirect(route('front.team.troupe.opera-troupe'));
            })->name('front.team.troupe');
            Route::get('opera-troupe', 'ActorController@troupe_opera')->name('front.team.troupe.opera-troupe');
            Route::get('ballet-troupe', 'ActorController@troupe_ballet')->name('front.team.troupe.ballet-troupe');
            Route::get('choir', 'ActorController@troupe_choir')->name('front.team.troupe.choir');
            Route::get('orchestra', 'ActorController@troupe_orchestra')->name('front.team.troupe.orchestra');
            Route::get('support-artists', 'ActorController@support_artists')->name('front.team.troupe.support-artists');
        });
/*        Route::get('conductors', 'ActorController@conductors')->name('front.team.conductors');*/
    });

    Route::get('guest-artists', 'ActorController@guest_artists')->name('front.team.guest-artists');
    Route::get('artist/{id}-{slug}', 'ActorController@show')->name('front.actors.show');
    Route::get('festivals/{id}-{slug}', 'FestivalController@show')->name('front.festivals.show');
    Route::get('albums', 'AlbumController@index')->name('front.albums.index');
    Route::get('albums/{id}-{slug}', 'AlbumController@show')->name('front.albums.show');
    Route::get('videos', 'VideoController@index')->name('front.videos.index');
    Route::get('releases', 'ArticleController@releases')->name('front.articles.releases');
    Route::get('releases/{id}-{slug}', 'ArticleController@release')->name('front.articles.release');
    Route::get('about', 'ArticleController@about')->name('front.articles.about');
    Route::get('articles/{id}-{slug}', 'ArticleController@article')->name('front.articles.article');
    Route::post('subscribe', 'SubscribeController@subscribe')->name('front.subscribe.subscribe');
    Route::get('verify/{token}', 'SubscribeController@verify')->name('front.subscribe.verify');
    Route::get('partners', 'PartnerController@index')->name('front.partners.index');
    Route::get('partners/{id}', 'PartnerController@show')->name('front.partners.show');
    Route::get('faq', 'FaqController@index')->name('front.faqs.index');
    Route::get('documentations/{id}-{slug}', 'DocController@index')->name('front.docs.index');
    Route::get('ebooks', 'EbookController@index')->name('front.ebooks.index');
    Route::get('friends', 'PageController@friendsMaecenas')->name('front.pages.friends');
    Route::get('jobs', 'PageController@jobs');
    Route::get('halls', 'PageController@halls')->name('front.pages.halls');
    Route::get('hall/{id}-{slug}', 'HallController@show')->name('front.hall.show');
    Route::get('projects/{id}-{slug}', 'ProjectController@show')->name('front.projects.show');
    Route::get('educations', 'PageController@educations')->name('front.projects.educations');
    Route::get('educational-programs', 'PageController@educationalPrograms')->name('front.projects.educationalPrograms');
    Route::get('international-partnership', 'PageController@internationalPartnership')->name('front.projects.internationalPartnership');
    Route::get('contests', 'PageController@contests')->name('front.contests.contests');
    Route::get('contests/{id}-{slug}', 'ProjectController@contests')->name('front.contests.contest');
    Route::get('where-to-go', 'PageController@whereToGo')->name('front.page.wheretogo');
    Route::get('support', 'PageController@support')->name('front.page.support');
    Route::get('virtual-tour', 'PageController@virtual')->name('front.page.virtual');
    Route::get('other', 'PageController@other')->name('front.page.different');
    Route::get('creative-projects/{id}-{slug}', 'ProjectController@creative')->name('front.creative.show');
    Route::get('vacancies/{id}-{slug}', 'VacancyController@show')->name('front.vacancies.show');
    Route::get('services', 'ServiceController@index')->name('front.services.index');
    Route::get('offstage', 'PageController@offstage')->name('front.pages.offstage');
    Route::get('board-of-trustees', 'PageController@teamTrust')->name('front.pages.teamTrust');
    Route::get('join-the-league-of-patrons', 'PageController@joinLeague')->name('front.pages.joinLeague');
    Route::get('join-the-club', 'PageController@joinClub')->name('front.pages.joinClub');
    Route::get('season-premiere', 'PageController@seasonPremiere')->name('front.pages.seasonPremiere');
    Route::get('tour-schedule', 'PageController@tourSchedule')->name('front.pages.tourSchedule');
    Route::get('special-events', 'PageController@specialEvents')->name('front.pages.specialEvents');
    Route::get('muzhab', 'PageController@muzhab')->name('front.pages.muzhab');
    Route::get('festivals', 'PageController@festivals')->name('front.pages.festivals');
    Route::get('{name}', 'PageController@show')->name('front.pages.show');
    Route::get('ticket-download/{orderHash}', 'Api\v1\OrderController@formPdf');
});

Route::get('laravel-filemanager', '\UniSharp\LaravelFilemanager\Controllers\LfmController@show');
Route::post('laravel-filemanager/upload', '\UniSharp\LaravelFilemanager\Controllers\UploadController@upload');
Route::get('actor/search', 'ActorController@search');
Route::get('performance/search', 'PerformanceController@search');
Route::post('language/change', 'LanguageController@change');

Route::get('admin/search/performance', 'SearchController@performance');

Route::prefix('admin')->namespace('Admin')->middleware(['auth', 'permission:admin-browse'])->group(function () {
    Route::get('dashboard', 'IndexController@index')->name('dashboard');
    Route::resource('banners', 'BannerController');
    Route::resource('slider', 'SliderController')->except(['show']);
    Route::get('homepage', 'HomePageController@index');
    Route::post('homepage', 'HomePageController@store');
    Route::get('homepage/edit', 'HomePageController@edit');
    Route::get('performance/get-new-date-section', 'PerformanceController@getNewDateSection');
    Route::post('/show', 'MessageController@show')->name('front.messages.show');
    Route::get('performance/search', 'PerformanceController@search')->name('admin.performance.search');
    Route::resource('performance', 'PerformanceController');
    Route::resource('performance-types', 'PerformanceTypeController');
    Route::resource('performance-roles', 'PerformanceRoleController')->only(['edit', 'update']);
//    Route::resource('performance-actors-roles', 'PerformanceRoleActorDateController');
    Route::resource('performance-actors-roles', 'PerformanceRoleActorDateController')->only(['edit', 'update']);
    Route::get('actor/search', 'ActorController@search')->name('admin.actor.search');
    Route::resource('actor', 'ActorController');
    Route::resource('actor_groups', 'ActorGroupController');
    Route::resource('actor-roles', 'ActorRoleController');
    Route::resource('articles', 'ArticleController');
    Route::resource('article-categories', 'ArticleCategoryController');
    Route::resource('festival', 'FestivalController');
    Route::resource('menu', 'MenuController');
    Route::resource('settings', 'SettingController');
    Route::resource('users', 'UserController');
    Route::get('profile', 'ProfileController@edit')->name('profile.edit');
    Route::patch('profile', 'ProfileController@update')->name('profile.update');
    Route::resource('roles', 'RoleController');
    Route::resource('permissions', 'PermissionController');
    Route::get('albums/search', 'AlbumController@search')->name('admin.albums.search');
    Route::resource('albums', 'AlbumController');
    Route::resource('album-categories', 'AlbumCategoryController');
    Route::get('videos/search', 'VideoController@search')->name('admin.videos.search');
    Route::resource('videos', 'VideoController');
    Route::resource('video-categories', 'VideoCategoryController');
    Route::resource('seasons', 'SeasonController');
    Route::resource('subscribers', 'SubscribeController');
    Route::get('export-subscribers', 'SubscribeController@export')->name('subscribers.export');
    Route::resource('faqs', 'FaqController');
    Route::resource('ebooks', 'EbookController');
    Route::resource('faqs-categories', 'FaqCategoryController');
    Route::resource('programs', 'ProgramController');
    Route::resource('documentations', 'DocumentationController');
    Route::resource('documentation-categories', 'DocumentationCategoryController');
    Route::resource('partners', 'PartnerController');
    Route::resource('partner-categories', 'PartnerCategoryController');
    Route::resource('pages', 'PageController');
    Route::resource('attributes', 'AttributeController');
    Route::resource('services', 'ServiceController');
    Route::resource('projects', 'ProjectController');
    Route::resource('project-categories', 'ProjectCategoryController');
    Route::resource('vacancies', 'VacancyController');
    Route::resource('messages', 'MessageController');
    Route::resource('price-patterns', 'PricePatternController');
    Route::resource('hall-price-patterns', 'HallPricePatternController');
    Route::resource('distributors', 'DistributorController');
    Route::get('distributors/types', 'DistributorController@types');
    Route::get('distributors/{distributor}/token', 'DistributorController@token')->name('distributors.token');
    Route::resource('halls', 'HallController');
    Route::resource('leftovers', 'LeftoverController')->only('store');
    Route::apiResource('ticket-templates', 'TicketTemplateController');
    Route::resource('donations', 'DonationController')->only(['index']);
    Route::resource('discounts', 'DiscountController');
    Route::resource('price-policies', 'PricePolicyController');
    Route::resource('commissions', 'CommissionController')->except(['show']);

    Route::get('distributors-list', 'DistributorController@getList');
    Route::put('price-patterns/{id}/price-zones', 'PricePatternController@updatePriceZones')->name('price-patterns.updatePriceZones');
    Route::get('hallWithSeats/{hallPricePatternId}', 'HallPricePatternController@getHallWithSeats');
    Route::get('pricePatterns/{pricePatternId}', 'PricePatternController@getPricePattern');
    Route::put('hall-price-patterns/{id}/seat-prices', 'HallPricePatternController@updateSeatPrice')->name('hall-price-patterns.updateSeatPrices');
    Route::put('hall-price-patterns/{id}/seat-prices-simple', 'HallPricePatternController@updateSeatPriceSimple')->name('hall-price-patterns.updateSeatPricesSimple');

    Route::get('hallSeats/{id}', 'HallController@getHallSeats')->name('halls.getSeats');

    Route::group(['prefix' => 'halls/{id}'], function () {
        Route::get('images', 'HallController@showImages')->name('halls.show-images');
        Route::put('updateSeats', 'HallController@updateHallSeats')->name('halls.updateSeats');
        Route::get('seat-images', 'HallController@hallSeatPosters')->name('halls.updateSeatPosters');
        Route::put('update-seat-posters', 'HallController@updateHallSeatPosters')->name('halls.updateSeatPosters');
    });

    Route::put('performance/{id}/updateDates', 'PerformanceController@updateDates')->name('performance.updateDates');
    Route::group(['prefix' => 'performanceCalendars/{id}'], function () {
        Route::get('/generateTickets', 'PerformanceCalendarController@generateTickets')->name('performanceCalendar.generateTickets');
        Route::get('/manageTickets', 'PerformanceCalendarController@manageTickets')->name('performanceCalendar.manageTickets');
        Route::get('/getDateWithTickets', 'PerformanceCalendarController@getDateWithTickets')->name('performanceCalendar.getDateWithTickets');
        Route::put('/updateDateTickets', 'PerformanceCalendarController@updateDateTickets')->name('performanceCalendar.updateDateTickets');
        Route::put('/updateDateTicketsSimple', 'PerformanceCalendarController@updateDateTicketsSimple')->name('performanceCalendar.updateDateTicketsSimple');
        Route::get('/dropTickets', 'PerformanceCalendarController@dropTickets')->name('performanceCalendar.dropTickets');
        Route::put('/setPricePolicy', 'PerformanceCalendarController@setPricePolicy')->name('performanceCalendar.setPricePolicy');
    });

    Route::group(['prefix' => 'cash-box', 'middleware' => ['permission:tickets-sold']], function () {
        Route::group(['prefix' => 'orders'], function () {
            Route::post('create', 'OrderController@create')->name('cash-box.orders.create');
            Route::post('create-for-distributor', 'OrderController@createForDistributor')->name('cash-box.orders.create-for-distributor');
            Route::get('search', 'OrderController@search')->name('cash-box.orders.search');
            Route::post('{id}/return', 'OrderController@return')->name('cash-box.orders.return');
            Route::post('{id}/confirm', 'OrderController@confirm')->name('cash-box.orders.confirm');
            Route::delete('{id}', 'OrderController@deleteBooking')->name('cash-box.orders.delete-booking');
        });
        Route::get('coming-dates', 'CashBoxController@comingDates'); // API for retrieving coming dates with events
        Route::get('events-date', 'CashBoxController@eventsDate'); // API for retrieving events on defined date
        Route::get('orders-date', 'OrderController@getPerDay'); // API for retrieving orders on defined date for cashier
    });

    Route::group(['prefix' => 'reports', 'middleware' => ['permission:report-list']], function () {
        Route::get('employee-sold', 'ReportController@employeeSold', ['middleware' => ['permission:report-list-own']])
            ->name('reports.employee-sold');
            Route::get('day-sold', 'ReportController@daySold', ['middleware' => ['permission:report-list-own']])
            ->name('reports.day-sold');
            Route::get('online-sold', 'ReportController@onlineSold', ['middleware' => ['permission:report-list-own']])
            ->name('reports.online-sold');
        Route::group(['middleware' => ['permission:report-list-total']], function () {
            Route::get('sold-period', 'ReportController@soldPeriod')->name('reports.sold-period');
            Route::get('distributors-sold', 'ReportController@distributorsSold')->name('reports.distributors-sold');
            Route::get('sold-price-groups', 'ReportController@soldPriceGroups')->name('reports.sold-price-groups');
            Route::get('event-sold-price-groups', 'ReportController@eventSoldPriceGroups')->name('reports.event-sold-price-groups');
            Route::get('event-tickets-sold', 'ReportController@eventTicketsSold')->name('reports.event-tickets-sold');
            Route::get('detailed-sold', 'ReportController@detailedSold')->name('reports.detailed-sold');
            Route::get('detailed-sold-by-orders', 'ReportController@detailedSoldByOrders')->name('reports.detailed-sold-by-orders');
            Route::get('event-distributor-booked', 'ReportController@eventDistributorBooked')->name('reports.event-distributor-booked');
            Route::get('event-distributor-sold', 'ReportController@eventDistributorSold')->name('reports.event-distributor-sold');
        });
        Route::get('constructor', 'ReportController@constructor')
            ->middleware(['role:admin|super-admin'])
            ->name('admin.reports.constructor');

        Route::get('view', 'ReportController@index')
            ->name('admin.reports.index');

        Route::get('view/{reportConstructor}', 'ReportController@view')
            ->name('admin.reports.view');

        Route::get('/{param?}/{param2?}', function () {
            return view('layouts.reports');
        })->name('reports.index');
    });

    Route::get('concierge', 'ConciergeController@index')->name('concierge.index');

    Route::get('cash-box/{param?}/{param2?}/{param3?}', function () {
        return view('layouts.cash-box');
    })->middleware(['permission:tickets-sold'])->name('cash-box.index');

    Route::get('tickets-designer/{param?}/{param2?}/{param3?}', function () {
        return view('layouts.tickets-designer');
    })->middleware(['permission:ticket-designer-manage'])->name('tickets-designer.index');

    Route::group(['prefix' => 'v2'], function() {
        Route::get('discounts', 'DiscountController@getList');
        Route::group(['namespace' => 'v2'], function() {
            Route::get('tickets/{id}', 'TicketController@show');
            Route::get('events/{id}/tickets', 'EventController@tickets');
        });
    });
});

Route::get('dev/update', 'DevController@update');
Route::get('dev/status', 'DevController@getStatus');
Route::get('dev/status/update', 'DevController@updateStatus');

Route::get('dev/routes', function() {
    \Artisan::call('route:list');
    return '<pre>' . \Artisan::output() . '</pre>';
});
