<?php
/**
 * Created by PhpStorm.
 * User: boris
 * Date: 02.03.20
 * Time: 8:31
 */

namespace App\Http\Controllers\Admin;

//use App\Models\HallPricePattern;
//use App\Http\Requests\StorePerformance;
//use App\Models\Performance;
//use App\Models\PerformanceType;
//use App\Models\Season;
//use App\Models\Hall;
//use App\Repositories\ImageRepository;
use App\Repositories\FileRepository;
use App\Repositories\PerformanceCalendarRepository;
use App\Repositories\PerformanceRepository;
//use App\Repositories\VideoRepository;
use Illuminate\Http\Request;

//use App\Http\Controllers\Controller;
//use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


class PerformanceActorRoleController
{
    use ImageManagerTrait;

    /**
     * @var PerformanceRepository
     */
    protected $performanceRepository;

    /**
     * @var FileRepository
     */
    protected $fileRepository;

    /**
     * @var PerformanceCalendarRepository
     */
    protected $performanceCalendarRepository;

    protected $performance_id;

    public function __construct(PartnerRepository $partnerRepository)
    {
        $this->middleware('permission:partner-list');
        $this->middleware('permission:partner-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:partner-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:partner-delete', ['only' => ['destroy']]);
    }

    /**
     * @param $performance_id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index($performance_id)
    {
        if (!$performance = $this->performanceRepository->getMultiLangModelById($performance_id)) {
            throw new NotFoundHttpException('Performance not found');
        }

//        $partners = Partner::with('category', 'translate', 'category.translate', 'media')->latest()->paginate();
        return view('admin.performance_actor_roles.index', compact('performance'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (!$performance = $this->performanceRepository->getMultiLangModelById($id)) {
            throw new NotFoundHttpException('Performance not found');
        }
        $data = $request->all();
        $dataInsert = [];
        foreach ($data['actors'] as $k => $v){
            $dataInsert[$k]['actorId'] = $v;
            $dataInsert[$k]['roleId'] = $data['roles'][$k];
        }
        $this->performanceRepository->addActorRoleToPerformance($dataInsert,$performance->id);
        return redirect()->route('performance.index', $id);

    }


}