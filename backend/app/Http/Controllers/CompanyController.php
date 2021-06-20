<?php

/**
 * This is common controller for company and campaign features
 * @author RJay Sharma
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TblCompanies;
use App\Models\TblCampaigns;
use Illuminate\Support\Facades\Validator;
use Exception;

class CompanyController extends Controller
{
    /**
     * Add New Company
     * @param Request $request
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
     */
    function addCompany(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'company_name'  => 'required | max:255',
                'company_email' => 'required|email',
                'phone_number'  => 'required',
                'country_id'    => 'required',

            ]);

            if ($validator->fails()) {
                return response()->json(['code' => 2, 'message' =>  $validator->messages()->first()]);
            }

            $companyId = $request->id;
            $companyObject = new TblCompanies();
            $companyDetail = $companyObject->getCompanyById($companyId, $request->user()->id);
            if(empty($companyDetail))
            {
                $companyObject->user_id        = $request->user()->id;
                $companyObject->company_name = $request->company_name;
                $companyObject->company_email = $request->company_email;
                $companyObject->country_id = $request->country_id;
                $companyObject->phone_number = $request->phone_number;
                $companyObject->first_name = $request->first_name;
                $companyObject->last_name = $request->last_name;
                $companyObject->company_website = $request->company_website;
                $companyObject->address = $request->address;
                $companyObject->city = $request->city;
                $companyObject->state = $request->state;
                $companyObject->zip = $request->zip;
                $companyObject->status = 1;
                $companyObject->created_at = date('Y-m-d H:i:s');
                $saved = $companyObject->save();
                if( !$saved ) {
                    return response()->json(['code' => 2, 'message' => 'Problem in saving data']);
                }

                //Also Create a Campaign with same name
                $this->createCampaign($companyObject->id, $request);

                $message = 'Company Added Successfully.';
            } else {
                $companyDetail->user_id        = $request->user()->id;
                $companyDetail->company_name = $request->company_name;
                $companyDetail->company_email = $request->company_email;
                $companyDetail->country_id = $request->country_id;
                $companyDetail->phone_number = $request->phone_number;
                $companyDetail->first_name = $request->first_name;
                $companyDetail->last_name = $request->last_name;
                $companyDetail->company_website = $request->company_website;
                $companyDetail->address = $request->address;
                $companyDetail->city = $request->city;
                $companyDetail->state = $request->state;
                $companyDetail->zip = $request->zip;
                $companyDetail->updated_at  = date('Y-m-d H:i:s');
                $updated = $companyDetail->update();
                if( !$updated ) {
                    return response()->json(['code' => 2, 'message' => 'Problem in updating data']);
                }
                $message = 'Company Updated Successfully.';
            }
            return response()->json(['code' => 1, 'message' => $message] );

        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    /**
     * Function to create campaign while creating company
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
    */
    private function createCampaign($companyId, Request $request)
    {
        try {

            $campaignObject = new TblCampaigns();
            $campaignObject->user_id = $request->user()->id;
            $campaignObject->campaign_name = $request->company_name;
            $campaignObject->company_id = $companyId;
            $campaignObject->country_id = $request->country_id;
            $campaignObject->phone_number = $request->phone_number;
            $campaignObject->save();

        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }


    /**
     * Get Company Listing
     *
     * @param Request $request
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function companyList(Request $request)
    {
        try 
        {
            $userId = $request->user()->id ?? 0;

            $companyObject = new TblCompanies();
            $companyList   = $companyObject->getCompanyList($userId);

            return response()->json(['code' => 1, 'data' => $companyList]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }


    /**
     * Delete Company
     */
    public function deleteCompany(Request $request, $id)
    {
        try 
        {
            $companyDelete = TblCompanies::findOrFail($id);

            if( $companyDelete ) {
                $companyDelete->status = 0;
                $companyDelete->updated_at = date('Y-m-d H:i:s');
                $companyDelete->save();
                return response()->json(['code' => 1, 'message' => "Company Deleted Successfully."]);
            } else {
                return response()->json(['code' => 2, 'message' => "Company Detail Not Found"]);
            }
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }

    }

    /**
     * Get Company Detail by Company Id
     */
    public function getCompanyById(Request $request, $id)
    {
        try
        {
            $userId = $request->user()->id ?? 0;
            $companyObject = new TblCompanies();
            $sourceData   = $companyObject->getCompanyById($id, $userId);
            if($sourceData) {
                return response()->json(['code' => 1, 'companyDetail' => $sourceData]);
            } else {
                return response()->json(['code' => 2, 'message' => "Company Detail Not Found"]);
            }
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    /**
     * Get Company Listing
     *
     * @param Request $request
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function campaignList(Request $request)
    {
        try 
        {
            $userId = $request->user()->id ?? 0;
            
            $campaignObject = new TblCampaigns();
            $companyList   = $campaignObject->getCampaignList($userId);

            return response()->json(['code' => 1, 'data' => $companyList]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }
    
    
    /**
     * Get All Active Companies
     * @param Request $request
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function activeCompaniesList(Request $request)
    {
        try 
        {
            $userId = $request->user()->id ?? 0;
            $countryList   = (new TblCompanies())->getAllActiveCompanies($userId);
            return response()->json(['code' => 1, 'data' => $countryList]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    /**
     * Get Campaign Detail by CampaignId
     */
    public function getCampaignById(Request $request, $id)
    {
        try
        {
            $userId = $request->user()->id ?? 0;
            $campaignObject = new TblCampaigns();
            $campaignData   = $campaignObject->getCampaignById($id, $userId);
            if($campaignData) {
                return response()->json(['code' => 1, 'campaignDetail' => $campaignData]);
            } else {
                return response()->json(['code' => 2, 'message' => "Campaign Detail Not Found"]);
            }
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

}
