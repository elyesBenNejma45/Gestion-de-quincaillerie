<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Counter
 *
 * @ORM\Table(name="counter")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CounterRepository")
 */
class Counter
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
     * @var int|null
     *
     * @ORM\Column(name="countNum", type="integer", nullable=true)
     */
    private $countNum;


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
     * @param int|null $countNum
     *
     * @return Counter
     */
    public function setCountNum($countNum = null)
    {
        $this->countNum = $countNum;

        return $this;
    }

    /**
     * Get countNum.
     *
     * @return int|null
     */
    public function getCountNum()
    {
        return $this->countNum;
    }
}
