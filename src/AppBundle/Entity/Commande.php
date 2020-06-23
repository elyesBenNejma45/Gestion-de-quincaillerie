<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Commande
 *
 * @ORM\Table(name="commande")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CommandeRepository")
 */
class Commande
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="comNum", type="string", length=255)
     */
    private $comNum;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateComm", type="date")
     */
    private $dateComm;

    /**
     * @var string
     *
     * @ORM\Column(name="observation", type="string", length=255)
     */
    private $observation;
   
    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=255)
     */
    private $status;
    
    /**
     * @var string
     *
     * @ORM\Column(name="totht", type="string", length=255)
     */
    private $totht;

    /**
     * @var string
     *
     * @ORM\Column(name="tottva", type="string", length=255)
     */
    private $tottva;

    /**
     * @var string
     *
     * @ORM\Column(name="totttc", type="string", length=255)
     */
    private $totttc;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="commandes")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id",onDelete="SET NULL",nullable=true)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="Client", inversedBy="commandes")
     * @ORM\JoinColumn(name="client_id", referencedColumnName="id",onDelete="SET NULL",nullable=true)
     */
    private $client;
    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set comNum.
     *
     * @param string $comNum
     *
     * @return Commande
     */
    public function setComNum($comNum)
    {
        $this->comNum = $comNum;

        return $this;
    }

    /**
     * Get comNum.
     *
     * @return string
     */
    public function getComNum()
    {
        return $this->comNum;
    }

    /**
     * Set dateComm.
     *
     * @param \DateTime $dateComm
     *
     * @return Commande
     */
    public function setDateComm($dateComm)
    {
        $this->dateComm = $dateComm;

        return $this;
    }

    /**
     * Get dateComm.
     *
     * @return \DateTime
     */
    public function getDateComm()
    {
        return $this->dateComm;
    }

    /**
     * Set observation.
     *
     * @param string $observation
     *
     * @return Commande
     */
    public function setObservation($observation)
    {
        $this->observation = $observation;

        return $this;
    }

    /**
     * Get observation.
     *
     * @return string
     */
    public function getObservation()
    {
        return $this->observation;
    }

    /**
     * Set totht.
     *
     * @param string $totht
     *
     * @return Commande
     */
    public function setTotht($totht)
    {
        $this->totht = $totht;

        return $this;
    }

    /**
     * Get totht.
     *
     * @return string
     */
    public function getTotht()
    {
        return $this->totht;
    }

    /**
     * Set tottva.
     *
     * @param string $tottva
     *
     * @return Commande
     */
    public function setTottva($tottva)
    {
        $this->tottva = $tottva;

        return $this;
    }

    /**
     * Get tottva.
     *
     * @return string
     */
    public function getTottva()
    {
        return $this->tottva;
    }

    /**
     * Set totttc.
     *
     * @param string $totttc
     *
     * @return Commande
     */
    public function setTotttc($totttc)
    {
        $this->totttc = $totttc;

        return $this;
    }

    /**
     * Get totttc.
     *
     * @return string
     */
    public function getTotttc()
    {
        return $this->totttc;
    }

    /**
     * Get the value of user
     */ 
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set the value of user
     *
     * @return  self
     */ 
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get the value of client
     */ 
    public function getClient()
    {
        return $this->client;
    }

    /**
     * Set the value of client
     *
     * @return  self
     */ 
    public function setClient($client)
    {
        $this->client = $client;

        return $this;
    }

    /**
     * Get the value of status
     *
     * @return  string
     */ 
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set the value of status
     *
     * @param  string  $status
     *
     * @return  self
     */ 
    public function setStatus(string $status)
    {
        $this->status = $status;

        return $this;
    }
}
