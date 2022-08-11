<?php
/**
 * Created by PhpStorm.
 * User: rise
 * Date: 5/31/2018
 * Time: 6:16 PM
 */

namespace App\Repositories;

use App\Models\Ebook;
use App\Models\EbookTranslation;


class EbookRepository extends Repository
{
    /**
     * Specify Model class name
     *
     * @return mixed
     */
    function model()
    {
        return Ebook::class;
    }

    public function createEbooks($data)
    {
        $ebook = [
        ];
        $ebook = $this->create($ebook);
        $this->addTranslationEbook($data, $ebook->id);
        return $ebook;
    }

    public function editEbooks($data, $id)
    {
        $array = [
        ];
        $this->update($array, ['id' => $id]);
        $ebook = Ebook::find($id);
        $this->editTranslationEbook($data, $ebook);
    }

    public function addTranslationEbook($data, $ebookId)
    {
        foreach (get_languages() as $lang => $val) {
            EbookTranslation::create([
                'ebook_id' => $ebookId,
                'language' => $lang,
                'title' => $data['title_' . $lang],
                'file' => $data['file_' . $lang] ?? null,
            ]);
        }
    }

    public function editTranslationEbook($data, $ebook)
    {
        foreach (get_languages() as $lang => $val) {
            $ebookTranslation = EbookTranslation::where(['ebook_id' => $ebook->id, 'language' => $lang])->first();
            $ebookTranslation->update([
                'ebook_id' => $ebook->id,
                'language' => $lang,
                'title' => $data['title_' . $lang],
                'file' => $data['file_' . $lang] ?? $ebook->translate($lang)->first()->file,
            ]);
        }
    }
}
