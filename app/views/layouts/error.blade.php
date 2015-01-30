<!DOCTYPE html>
<html>
<head>
    @include('includes.head')
    <?= stylesheet_link_tag('framework') ?>
</head>

<body class="error-body no-top">
@yield('content')
@include('includes.footer')
<?= javascript_include_tag('framework') ?>
</body>
</html>