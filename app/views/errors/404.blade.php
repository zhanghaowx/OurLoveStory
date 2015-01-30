@extends('layouts.error')
@section('content')
<div class="error-wrapper container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-offset-1 col-xs-10">
            <div class="error-container" >
                <div class="error-main">
                    <div class="error-number"> 404 </div>
                    <div class="error-description" > We seem to have lost you in the clouds. </div>
                    <div class="error-description-mini"> The page your looking for is not here </div>
                    <br>
                    <div class="row">
                        <div class="input-with-icon col-md-12"> <i class="fa fa-search"></i>
                            <input type="text" class="form-control" id="form1Name" name="form1Name">
                        </div>
                    </div>
                    <br>
                    <button class="btn btn-primary btn-cons" type="button">Search</button>
                </div>
            </div>

        </div>
    </div>
</div>
@stop