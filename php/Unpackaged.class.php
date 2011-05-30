<?php
class Unpackaged {
    /**
     * 设置unpack环境
     * @return void
     */
    function __construct($server,$build = 'build.xml',$xpath = '/project/target/concat') {
        $this->server = $server;
        $this->build = $build;
        $this->xpath = $xpath;        
    }
    /**
     * 获取时间戳
     * @return String
     */
    public function getStamp() {
        return date("Ymd");
    }
    /**
     * 获取解包后文件路径
     * @return String
     */
    private function getPath($node) {
        $arr = $node->attributes();
        $ret = $arr['path']; 
        return $ret;
    }
    /**
     * 解析文件扩展名并生成对应的文件引用方式
     * @params $filename 文件名
     * @return Array
     */
    private function setTemplate($filename) {
        $type = preg_split('/\./',$filename);
        $type = $type[count($type)-1]; 
        $stamp = $this->getStamp();
        if ($type== 'js') {
            $temp = '<script type="text/javascript" src="{url}?t='.$stamp.'.js"></script>';
        } else {
            $temp = '<link rel="stylesheet" type="text/css" href="{url}?t='.$stamp.'.css" />';
        };
        return array($temp,$type);
    }
    /**
     * 解包文件
     * @params $filename 文件名
     * @return void
     */
    public function unpack($filename) {
        $server = $this->server;
        $build = $this->build;
        $xpath = $this->xpath;

        $xml = simplexml_load_file($server.'/'.$build); 
        $concat = $xml->xpath($xpath.'[@destfile="'.$filename.'"]');
        $nodes = $concat[0]->children();

        $temp = $this->setTemplate($filename);
        $arr = array();
        foreach ($nodes as $node) {
            $arr[] = preg_replace('/(.*){url}(.*)/','\1'.$server.'/'.$this->getPath($node).'\2',$temp[0]);
        };

        $output = implode("\r",$arr);
        echo $output."\r";
    }
    /**
     * 兼容原始大文件方式
     * @params $filename 文件名
     * @return void
     */
    public function getCompat($filename) {
        $server = $this->server;

        $temp = $this->setTemplate($filename);
        $s =  preg_replace('/(.*){url}(.*)/','\1'.$server.'/'.$filename.'\2',$temp[0]);
        echo $s;
    }
    /**
     * 解析输入
     * @params $filename 文件名
     * @return void
     */
    public function load($min,$compat = false) {
        $server = $this->server;
        $build = $this->build;

        $combo = $compat ? preg_replace('/\.(js|css).*/','.source.\1',$min) : preg_replace('/-min/','',$min);
        $temp = $this->setTemplate($combo); 
        $debug = $_REQUEST['debug'];

        if (isset($debug)) {
            if ($compat) {
                $this->getCompat($combo);
            } else {
                $this->unpack($combo);
            };
        } else {
            if ($compat) {
                $this->getCompat($min);
            } else {
                echo preg_replace('/(.*){url}(.*)/','\1'.$server.'/'.$min.'\2',$temp[0]);
            };
        };
    }
    function __destruct() {}
}
?>
