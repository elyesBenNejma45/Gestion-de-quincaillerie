<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Lcommande
 *
 * @ORM\Table(name="lcommande")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\LcommandeRepository")
 */
class Lcommande
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
     * @var string|null
     *
     * @ORM\Column(name="countNum", type="string", length=255, nullable=true)
     */
    private $countNum;

    /**
     * @var string
     *
     * @ORM\Column(name="quantity", type="string", length=255)
     */
    private $quantity;

    /**
     * @var float|null
     *
     * @ORM\Column(name="tva", type="float")
     */
    private $tva;

    /**
     * @var string
     *
     * @ORM\Column(name="lig", type="string", length=255)
     */
    private $lig;

    /**
     * @ORM\ManyToOne(targetEntity="Product", inversedBy="lcommandes")
     * @ORM\JoinColumn(name="product_id", referencedColumnName="id",onDelete="SET NULL",nullable=true)
     */
    private $product;

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
     * Set countNum.
     *
     * @param string|null $countNum
     *
     * @return Lcommande
     */
    public function setCountNum($countNum = null)
    {
        $this->countNum = $countNum;

        return $this;
    }

    /**
     * Get countNum.
     *
     * @return string|null
     */
    public function getCountNum()
    {
        return $this->countNum;
    }

    /**
     * Set quantity.
     *
     * @param string $quantity
     *
     * @return Lcommande
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * Get quantity.
     *
     * @return string
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * Set tva.
     *
     * @param float $tva
     *
     * @return Lcommande
     */
    public function setTva($tva)
    {
        $this->tva = $tva;

        return $this;
    }

    /**
     * Get tva.
     *
     * @return float
     */
    public function getTva()
    {
        return $this->tva;
    }

    /**
     * Set lig.
     *
     * @param string $lig
     *
     * @return Lcommande
     */
    public function setLig($lig)
    {
        $this->lig = $lig;

        return $this;
    }

    /**
     * Get lig.
     *
     * @return string
     */
    public function getLig()
    {
        return $this->lig;
    }

    /**
     * Get the value of product
     */ 
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * Set the value of product
     *
     * @return  self
     */ 
    public function setProduct($product)
    {
        $this->product = $product;

        return $this;
    }
}
