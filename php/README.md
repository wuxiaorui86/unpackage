## Guide
- get class

    <?php 
        include\('Unpackaged.class.php'\);
        $hosts = $_SERVER\['SERVER_ADDR'\];
        $server = 'http://' \.$hosts\.'/assets_daily/daily/apps/dpm/bbc/v2';
        $assets = new Unpackaged\($server\);
        $stamp = $assets\->getStamp\(\);
    ?>
- load

    <?php $assets\->load\('dist-combo-min\.js'\); ?>
