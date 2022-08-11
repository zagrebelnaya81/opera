<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use SEO;
use App\Models\Actor;
use App\Models\ActorGroup;
use App\Models\ActorTranslation;
use Illuminate\Support\Facades\DB;

class ActorController extends Controller
{
    public function management()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with(['translate',
            'children_groups', 
            'children_groups.translate',
            'children_groups.actors', 
            'children_groups.actors.translate'
            ])->where('name', 'management')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_management', compact('groups', 'currentGroup'));
    }

    public function directors()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with(['translate',
            'children_groups', 'children_groups.translate',
            'children_groups.actors', 'children_groups.actors.translate'])->where('name', 'directors')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_directors', compact('groups', 'currentGroup'));
    }

    public function artistic_management()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors', 
            'children_groups.actors.translate'
        ])->where('name', 'artistic-management')->orderBy('sort_order')->first();

        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_artistic', compact('groups', 'currentGroup'));
    }

    public function artists()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with('translate',
            'children_groups', 'children_groups.translate',
            'children_groups.actors', 'children_groups.actors.translate')->where('name', 'artists')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_painters', compact('groups', 'currentGroup'));
    }

    public function troupe_opera()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            // 'children_groups.actors',
            'children_groups.actors' => function($query){
                $query->select('actors.*')->join(
                    'actor_translations as at',
                    'actors.id', '=', 'at.actor_id'
                )->where('language', 'ua')->orderBy('lastName', 'asc');
            },
            'children_groups.actors.translate'
        ])->where('name', 'opera-troupe')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_troupe_opera', compact('groups', 'currentGroup'));
    }

    public function troupe_ballet()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with(['translate',
            'children_groups', 'children_groups.translate',
            'children_groups.actors' => function($query){
                $query->select('actors.*')->join(
                    'actor_translations as at',
                    'actors.id', '=', 'at.actor_id'
                )->where('language', 'ua')->orderBy('lastName', 'asc');
            }, 'children_groups.actors.translate'])->where('name', 'ballet-troupe')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_troupe_ballet', compact('groups', 'currentGroup'));
    }

    public function troupe_choir()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            // 'children_groups.actors',
            'children_groups.actors' => function($query){
                $query->select('actors.*')->join(
                    'actor_translations as at',
                    'actors.id', '=', 'at.actor_id'
                )->where('language', 'ua')->orderBy('lastName', 'asc');
            },
            'children_groups.actors.translate'
        ])->where('name', 'choir')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_troupe_chorus', compact('groups', 'currentGroup'));
    }

    public function troupe_orchestra()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with(['translate',
            'children_groups', 'children_groups.translate',
            'children_groups.actors' => function($query){
                $query->select('actors.*')->join(
                    'actor_translations as at',
                    'actors.id', '=', 'at.actor_id'
                )->where('language', 'ua')->orderBy('lastName', 'asc');
            },
            'children_groups.actors.translate'])->where('name', 'orchestra')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_troupe_orchestra', compact('groups', 'currentGroup'));
    }

    public function support_artists()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        ])->where('name', 'support-artists')->first();

        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.support_artists', compact('groups', 'currentGroup'));
    }

    public function guest_artists()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        ])->where('name', 'invited-artists')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_troupe_opera', compact('groups', 'currentGroup'));
    }

/*    public function invited_artists()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with(
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        )->where('name', $subgroup)->firstOrFail();

        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_artistic', compact('groups', 'currentGroup'));
    }*/

    public function invited_artists(string $subgroup = 'art-directors')
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        ])->where('name', $subgroup)->firstOrFail();

        $parentGroup = $currentGroup->parent_group;
        $childrenGroups = $parentGroup->children_groups;

        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.invited_artists', compact('groups', 'currentGroup', 'childrenGroups', 'parentGroup'));
    }


    public function art_directors(string $subgroup = 'arts')
    {
        //$groupName = $subgroup ?? 'art-directors';

        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with(
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        )->where('name', $subgroup)->firstOrFail();

        $parentGroup = $currentGroup->parent_group;
        $childrenGroups = $parentGroup->children_groups;

        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        // return view('pages.theatre.pages.art_directors', compact('groups', 'currentGroup', 'childrenGroups', 'parentGroup'));
        return view('pages.theatre.pages.invited_artists', compact('groups', 'currentGroup', 'childrenGroups', 'parentGroup'));
    }

    public function production_part($subgroup = null)
    {
        $groupName = $subgroup ?? 'production-part';

        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with('translate',
            'children_groups', 'children_groups.translate',
            'children_groups.actors', 'children_groups.actors.translate')->where('name', $groupName)->firstOrFail();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        // return view('pages.theatre.pages.team_directors', compact('groups', 'currentGroup'));
        return view('pages.theatre.pages.invited_artists', compact('groups', 'currentGroup',  'childrenGroups', 'parentGroup'));
    }
    

    public function operation_part($subgroup = null)
    {
        $groupName = $subgroup ?? 'operation-part';

        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with('translate',
            'children_groups', 'children_groups.translate',
            'children_groups.actors', 'children_groups.actors.translate')->where('name', $groupName)->firstOrFail();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        // return view('pages.theatre.pages.team_directors', compact('groups', 'currentGroup'));
        return view('pages.theatre.pages.invited_artists', compact('groups', 'currentGroup',  'childrenGroups', 'parentGroup'));

    }

   
    public function artistspart_artists()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        ])->where('name', 'artistspart-artists')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_artistspart', compact('groups', 'currentGroup'));
    }

    public function artistspart_product()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        ])->where('name', 'artistspart-product')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_artistspart', compact('groups', 'currentGroup'));
    }
    public function artistspart_operation()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        ])->where('name', 'artistspart-operation')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_artistspart', compact('groups', 'currentGroup'));
    }

    public function conductors()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with(
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        )->where('name', 'conductors')->first();

        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_artistic', compact('groups', 'currentGroup'));
    }

    public function directors_choreographers()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with(
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        )->where('name', 'conductors')->first();

        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_artistic', compact('groups', 'currentGroup'));
    }

    public function diregor()
    {
        $groups = $this->getActorGroups();
        $currentGroup = ActorGroup::with([
            'translate',
            'children_groups',
            'children_groups.translate',
            'children_groups.actors',
            'children_groups.actors.translate'
        ])->where('name', 'diregor')->first();
        SEO::setTitle($currentGroup->translate->seo_title ?? $currentGroup->translate->title);
        SEO::setDescription($currentGroup->translate->seo_description);
        return view('pages.theatre.pages.team_diregor', compact('groups', 'currentGroup'));
    }

    public function show($id, $slug)
    {
        if (!$actor = Actor::with('translate',
            'group', 'group.translate',
            'calendars', 'calendars.date',
            'calendars.performance', 'calendars.performance.translate',
            'articles', 'articles.translate', 'articles.media'
        )->find($id)) {
            abort(404);
        }

        if ($actor->translate->slug !== $slug) {
            return redirect()->route('front.actors.show', ['id' => $id, 'slug' => $actor->translate->slug]);
        }

        $showContacts = ! in_array($actor->group->name, [
            'managers',
            'management',
            'guest-artists',
            'artistic-management'
        ]);

        $articleRoute = 'front.articles.release';
        $performanceRoute = 'front.events.show';
        SEO::setTitle($actor->translate->seo_title);
        SEO::setDescription($actor->translate->seo_description);
        return view('pages.theatre.pages.artist', compact('actor', 'articleRoute', 'performanceRoute', 'showContacts'));
    }

    public function search()
    {
        return ActorTranslation::where(
            DB::raw('CONCAT(firstName, \' \', lastName)'),
            'LIKE',
            '%' . request('q') . '%'
        )->select([
            DB::raw('CONCAT(firstName, \' \', lastName) AS fullName'),
            'actor_id as id'])->paginate(10);
    }

    protected function getActorGroups()
    {
        $groups = ActorGroup::with('translate')->where(['parent_id' => null, 'is_active' => true])->orderBy('sort_order')->get();
        $groups->prepend($groups->pop($groups->where('name', 'management')->first()));
        return $groups;
    }
}
