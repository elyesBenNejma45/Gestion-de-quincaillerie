<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Lcommande;
use AppBundle\Form\LcommandeType;
use AppBundle\Form\EditLcommandeType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class LcommandeController extends Controller
{
    /**
     * 
     * @Route("/showLcommande", name="admin.lcommande.index")
     * 
     */
    public function indexAdmin()
    {
        $em = $this->getDoctrine()->getManager();
        $lcommandes = $em->getRepository(Lcommande::class)->findAll();
        return $this->render("AppBundle:Lcommande:indexLcommande.html.twig", compact("lcommandes"));
    }
    
    /**
     * 
     *@Route("/lcommande/new",name ="admin.lcommande.add")
     * 
     */
    public function new(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $lcommande = new Lcommande();
        $form = $this->createForm(LcommandeType::class, $lcommande);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $em->persist($lcommande);
            $em->flush();            
            $this->addFlash("success", "Added with success ");
            return $this->redirectToRoute("admin.lcommande.index");
        }
        return $this->render("AppBundle:Lcommande:addLcommande.html.twig", [
            "lcommande" => $lcommande,
            "form" => $form->createView()
        ]);
    }
    /**
     * 
     *@Route("/lcommande/{id}",name ="admin.lcommande.edit", methods = "GET|POST") 
     *@param Lcommande $lcommande
     *@param Request $request
     *return Symfony\Component\HttpFoundation\Response
     */
    public function edit(Lcommande $lcommande,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(EditLcommandeType::class, $lcommande);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $em->flush();
            $this->addFlash("success", "modified with succes ");
            return $this->redirectToRoute("admin.lcommande.index");
        }
        return $this->render("AppBundle:Lcommande:editLcommande.html.twig", [
            "lcommande" => $lcommande,
            "form" => $form->createView()
        ]);
    }

     /**
     *@Route("/lcommande/{id}",name ="admin.lcommande.delete",  methods = "DELETE")
     *@param Lcommande $lcommande
     * 
     */
    public function delete(Lcommande $lcommande)
    {
            $em = $this->getDoctrine()->getManager();
            $em->remove($lcommande);
            $em->flush();
            $this->addFlash("success", "Deleted with succes ");
            return $this->redirectToRoute("admin.lcommande.index");

    }  
}
