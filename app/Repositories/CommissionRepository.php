<?php

namespace App\Repositories;

use App\Models\Commission;
use App\Models\CommissionTranslation;


class CommissionRepository extends Repository
{
    /**
     * Specify Model class name
     *
     * @return mixed
     */
    function model()
    {
        return 'App\Models\Commission';
    }

    public function createCommission($data)
    {
        $commission = [
            'size' => $data['size'],
        ];
        $commission = $this->create($commission);
        $this->addTranslationCommission($data, $commission->id);
    }

    public function editCommission($data, $id)
    {
        $array = [
            'size' => $data['size'] ?? null,
        ];
        $this->update($array, ['id' => $id]);
        $commission = Commission::find($id);
        $this->editTranslationCommission($data, $commission);
    }

    public function addTranslationCommission($data, $commissionId)
    {
        foreach (get_languages() as $lang => $val) {
            CommissionTranslation::create([
                'commission_id' => $commissionId,
                'language' => $lang,
                'title' => $data['title_' . $lang],
            ]);
        }
    }

    public function editTranslationCommission($data, $commission)
    {
        foreach (get_languages() as $lang => $val) {
            $commissionTranslation = CommissionTranslation::where(['commission_id' => $commission->id, 'language' => $lang])->first();
            $commissionTranslation->update([
                'commission_id' => $commission->id,
                'language' => $lang,
                'title' => $data['title_' . $lang],
            ]);
        }
    }
}
