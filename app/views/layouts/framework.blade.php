<!DOCTYPE html>
<html>
<head>
    @include('includes.head')
    <title>Webarch Demo</title>
    <?= stylesheet_link_tag('framework') ?>
</head>
<body>
@include('includes.header')
<!-- BEGIN CONTENT -->
<div class="page-container row-fluid">
    @include('includes.sidebar')
    <!-- BEGIN PAGE CONTAINER-->
    <div class="page-content">
        <div class="content">
            <!-- BEGIN PAGE TITLE -->
            <div class="page-title">
                <h3>Master Page</h3>
            </div>
            <!-- END PAGE TITLE -->
            <!-- BEGIN PlACE PAGE CONTENT HERE -->
            @yield('content')
            <!-- END PLACE PAGE CONTENT HERE -->
        </div>
    </div>
    <!-- END PAGE CONTAINER -->
</div>
<!-- END CONTENT -->
@include('includes.chat')

<?= javascript_include_tag('framework') ?>
<!-- BEGIN CORE TEMPLATE JS -->
<script src="assets/pages/core.js" type="text/javascript"></script>
<script src="assets/pages/chat.js" type="text/javascript"></script>
<!-- END CORE TEMPLATE JS -->

</body>
</html>