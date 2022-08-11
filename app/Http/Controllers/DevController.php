<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DevController extends Controller
{
    public function update(Request $request)
    {
        switch ($request->input('param')) {
            case 'update':
                $this->pull();
                break;
            case 'migrate':
                $this->migrate();
                break;
            case 'update-components':
                $this->updateComponents();
                break;
            default:
                break;
        }
        echo 'Project was successfully updated';
    }

    protected function pull()
    {
        exec('git stash');
        exec('git pull');
        exec('sudo chmod -R 777 /home/admin/web/the*');
    }

    protected function migrate()
    {
        exec('php artisan migrate');
    }

    protected function updateComponents()
    {
        exec('composer install');
    }

    public function getStatus()
    {
        $settings = file_get_contents(env('SETTINGS_PATH'));
        $settings = json_decode($settings);
        $this->printSettings($settings);
    }

    public function updateStatus(Request $request)
    {
        $paramGroup = $request->input('group') ?? '';
        $paramName = $request->input('name') ?? '';
        $paramValue = $request->input('value') ?? '';

        $settings = file_get_contents(env('SETTINGS_PATH'));
        $settings = json_decode($settings);

        $settings->$paramGroup->$paramName = $paramValue;
        $this->printSettings($settings);

        $settings = json_encode($settings);

        file_put_contents(env('SETTINGS_PATH'), $settings);


        return 'Success';
    }

    private function printSettings($settings)
    {
        foreach ($settings as $settingName => $settingValue) {
            if (gettype($settingValue) == 'object') {
                echo "<b>$settingName :</b> <br>";
                $this->printSettings($settingValue);
                echo "<br>";
            } else {
                echo "$settingName : $settingValue <br>";
            }
        }
    }
}
