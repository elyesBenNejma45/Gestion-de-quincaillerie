<?php
// src/AppBundle/Entity/User.php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="Product", mappedBy="user")
     */
    private $products;

    /**
     * @ORM\OneToMany(targetEntity="Client", mappedBy="user")
     */
    private $clients;

    /**
     * @ORM\OneToMany(targetEntity="Commande", mappedBy="user")
     */
    private $commandes;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of products
     */ 
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * Set the value of products
     *
     * @return  self
     */ 
    public function setProducts($products)
    {
        $this->products = $products;

        return $this;
    }

    /**
     * Get the value of clients
     */ 
    public function getClients()
    {
        return $this->clients;
    }

    /**
     * Set the value of clients
     *
     * @return  self
     */ 
    public function setClients($clients)
    {
        $this->clients = $clients;

        return $this;
    }

    /**
     * Get the value of commandes
     */ 
    public function getCommandes()
    {
        return $this->commandes;
    }

    /**
     * Set the value of commandes
     *
     * @return  self
     */ 
    public function setCommandes($commandes)
    {
        $this->commandes = $commandes;

        return $this;
    }
}