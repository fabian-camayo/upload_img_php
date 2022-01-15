<?php
    $directory = './uploads/';
    $dirint = dir($directory);
    
    while (($archivo = $dirint->read()) !== false)
    {
        if (strpos($archivo,".jpg")){
            $items[] = $directory . $archivo;
        }
        
    }
    $dirint->close();
    if (isset($items)){
        $return = implode(",",$items);  
        echo $return;
    }
?>