<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class CalendarResource extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $actors = [];
//            dd($this->actors);
        foreach ($this->actors as $actor) {
            $actors[] = $actor->fullName;
        }

        return [
            'title' => $this->performance->translate->title,
            'dateTime' => (new \DateTime($this->date))->format('Y-m-d' . '\T' . 'H:i:s'),
            'type' => $this->performance->type->name,
            'typeName' => $this->performance->type->translate->title,
            'actors' => $actors,
            'author' => strip_tags($this->performance->translate->author),
            'isSoldOnline' => (boolean)$this->isSoldOnline,
            'isTicketsAvailable' => $this->areTicketsGenerated && $this->tickets->where('isAvailable', true)->count(),
            'performanceUrl' => route('front.events.show', ['id' => $this->performance->id, 'slug' => $this->performance->translate->slug]),
            'performanceDateUrl' => route('front.events-date.show', ['id' => $this->id]),
            'eventUrl' => $this->isSoldOnline ? 'ticket/perfomance/' . $this->id : null,
            'imageUrl' => $this->performance->getFirstMediaUrl('posters', 'slider-new'),
            'scene' => $this->performance->hall->name,
            'sceneName' => $this->performance->hall->translate->title,
            'time' => (new \DateTime($this->date))->format('H:i'),
            'price' => [
                'min' => $this->areTicketsGenerated ? $this->priceFrom() : null,
                'max' => $this->areTicketsGenerated ? $this->priceTo() : null
            ],
        ];
    }
}
