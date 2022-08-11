<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use Closure;

class GenerateMenus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $currentLocale = session('locale');
        if(!session('menuItems.' . $currentLocale)) {
            $menuItems = Menu::with('translate', 'children_items', 'children_items.translate')->where('parent_id', null)->orderBy('position')->get();
            session(['menuItems.' . $currentLocale => $menuItems]);
        }

        \Menu::make('mainMenu', function ($menu) use ($currentLocale) {
            foreach (session('menuItems.' . $currentLocale) as $item) {
                $menu->add($item->translate->menu, ['url' => $item->url, 'id' => $item->id]);
                if (\count($item->children_items) !== 0) {
                    foreach ($item->children_items as $childrenItem) {
                        $menu->find($item->id)->add($childrenItem->translate->menu, ['url' => $childrenItem->url, 'id' => $childrenItem->id]);
                    }
                }
            }
        });

        return $next($request);
    }
}
