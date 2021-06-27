<?php

namespace App\Component;

use Exception;

class Encryption
{
    private $secretKey       = "?8WmctU^VgGKF!aE";
    private $secretIv        = "qm8/gjRb5F&'7r!%";
    protected $encryptMethod = "AES-256-CBC";
    private $output          = NULL;

    /**
     * The function return Encrypted value
     * @var string || array
     */
    public function EncryptDecrypt($action, $string)
    {
        try {

            $key = hash('sha256',       $this->secretKey);
            $iv = substr(hash('sha256', $this->secretIv), 0, 16);

            if ($action == 'encrypt') {
                $output = openssl_encrypt($this->serializeArray($string), $this->encryptMethod, $key, 0, $iv);
                $this->output = base64_encode($output);
            } else if ($action == 'decrypt') {
                $this->output = openssl_decrypt(base64_decode($this->unSerializeString($string)), $this->encryptMethod, $key, 0, $iv);
            }
        } catch (Exception $e) {
        }

        return $this->output;
    }

    /**
     * The function return serialize  array or string value
     * @var string || array
     */
    public function serializeArray($string)
    {

        if (is_array($string))
            return serialize($string);

        return $string;
    }

    /**
     * The function return unserialize or string value 
     *
     * @var string
     */
    public function unSerializeString($string)
    {

        $string = @unserialize($string);
        if ($string === 'b:0;' || $string !== false) {
            return $string;
        } else {
            return $string;
        }
    }
}
