<?php
class Unpackaged {
    /**
     * ����unpack����
     * @return void
     */
    function __construct($server,$build = 'build.xml',$xpath = '/project/target/concat') {
        $this->server = $server;
        $this->build = $build;
        $this->xpath = $xpath;        
    }
    /**
     * ��ȡʱ���
     * @return String
     */
    public function getStamp() {
        return date("Ymd");
    }
    /**
     * ��ȡ������ļ�·��
     * @return String
     */
    private function getPath($node) {
        $arr = $node->attributes();
        $ret = $arr['path']; 
        return $ret;
    }
    /**
     * �����ļ���չ�������ɶ�Ӧ���ļ����÷�ʽ
     * @params $filename �ļ���
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
     * ����ļ�
     * @params $filename �ļ���
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
     * ����ԭʼ���ļ���ʽ
     * @params $filename �ļ���
     * @return void
     */
    public function getCompat($filename) {
        $server = $this->server;

        $temp = $this->setTemplate($filename);
        $s =  preg_replace('/(.*){url}(.*)/','\1'.$server.'/'.$filename.'\2',$temp[0]);
        echo $s;
    }
    /**
     * ��������
     * @params $filename �ļ���
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
