<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Product
 *
 * @ORM\Table(name="product")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ProductRepository")
 */
class Product
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
     * @ORM\Column(name="libelle", type="string", length=255, nullable=true)
     */
    private $libelle;

    /**
     * @var float|null
     *
     * @ORM\Column(name="price", type="float", nullable=true)
     */
    private $price;

    /**
     * @var float|null
     *
     * @ORM\Column(name="tva", type="float", nullable=true)
     */
    private $tva;

    /**
     * @var integer|null
     *
     * @ORM\Column(name="quantity", type="integer", nullable=true)
     */
    private $quantity;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="storeDate", type="datetime", nullable=true)
     */
    private $storeDate;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="status", type="string", length=255, nullable=true)
     */
    private $status;

    /**
     * @var string|null
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="products")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id",onDelete="SET NULL",nullable=true)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="SubCategory", inversedBy="subProducts")
     * @ORM\JoinColumn(name="subCategory_id", referencedColumnName="id",onDelete="SET NULL",nullable=true)
     */

    private $subCategory;
    
        /**
     * @ORM\OneToMany(targetEntity="Lcommande", mappedBy="product")
     */
    private $lcommandes;
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
     * Set libelle.
     *
     * @param string|null $libelle
     *
     * @return Product
     */
    public function setLibelle($libelle = null)
    {
        $this->libelle = $libelle;

        return $this;
    }

    /**
     * Get libelle.
     *
     * @return string|null
     */
    public function getLibelle()
    {
        return $this->libelle;
    }

    /**
     * Set price.
     *
     * @param float|null $price
     *
     * @return Product
     */
    public function setPrice($price = null)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get quantity.
     *
     * @return integer|null
     */
    public function getQuantity()
    {
        return $this->quantity;
    }
    /**
     * Set quantity.
     *
     * @param integer|null $quantity
     *
     * @return Product
     */
    public function setQuantity($quantity = null)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * Get price.
     *
     * @return float|null
     */
    public function getPrice()
    {
        return $this->price;
    }
    /**
     * Set tva.
     *
     * @param float|null $tva
     *
     * @return Product
     */
    public function setTva($tva = null)
    {
        $this->tva = $tva;

        return $this;
    }

    /**
     * Get tva.
     *
     * @return float|null
     */
    public function getTva()
    {
        return $this->tva;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Product
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set storeDate.
     *
     * @param \DateTime|null $storeDate
     *
     * @return Product
     */
    public function setStoreDate($storeDate = null)
    {
        $this->storeDate = $storeDate;

        return $this;
    }

    /**
     * Get storeDate.
     *
     * @return \DateTime|null
     */
    public function getStoreDate()
    {
        return $this->storeDate;
    }

    /**
     * Set status.
     *
     * @param string|null $status
     *
     * @return Product
     */
    public function setStatus($status = null)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return string|null
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Get the value of image
     *
     * 
     */ 
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set the value of image
     *
     * 
     *
     * @return  self
     */ 
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
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
     * Get the value of subCategory
     */ 
    public function getSubCategory()
    {
        return $this->subCategory;
    }

    /**
     * Set the value of subCategory
     *
     * @return  self
     */ 
    public function setSubCategory($subCategory)
    {
        $this->subCategory = $subCategory;

        return $this;
    }

    /**
     * Get the value of lcommandes
     */ 
    public function getLcommandes()
    {
        return $this->lcommandes;
    }

    /**
     * Set the value of lcommandes
     *
     * @return  self
     */ 
    public function setLcommandes($lcommandes)
    {
        $this->lcommandes = $lcommandes;

        return $this;
    }
}
