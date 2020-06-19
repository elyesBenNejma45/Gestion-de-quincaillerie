<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Counter;
use AppBundle\Form\CounterType;
use AppBundle\Form\EditCounterType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class CounterController extends Controller
{
    /**
     * 
     * @Route("/counter", name="admin.counter.index")
     * 
     */
    public function indexAdmin()
    {
        $em = $this->getDoctrine()->getManager();
        $counters = $em->getRepository(Counter::class)->findAll();
        return $this->render("AppBundle:Counter:indexCounter.html.twig", compact("counters"));
    }
    
    /**
     * 
     *@Route("/counter/new",name ="admin.counter.add")
     * 
     */
    public function new(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $counter = new Counter();
        $form = $this->createForm(CounterType::class, $counter);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $em->persist($counter);
            $em->flush();            
            $this->addFlash("success", "Added with success ");
            return $this->redirectToRoute("admin.counter.index");
        }
        return $this->render("AppBundle:Counter:addCounter.html.twig", [
            "counter" => $counter,
            "form" => $form->createView()
        ]);
    }

    /**
     * 
     *@Route("/counter/{id}",name ="admin.counter.edit", methods = "GET|POST") 
     *@param Counter $counter
     *@param Request $request
     *return Symfony\Component\HttpFoundation\Response
     */
    public function edit(Counter $counter,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(EditCounterType::class, $counter);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $em->flush();
            $this->addFlash("success", "modified with succes ");
            return $this->redirectToRoute("admin.counter.index");
        }
        return $this->render("AppBundle:Counter:editCounter.html.twig", [
            "counter" => $counter,
            "form" => $form->createView()
        ]);
    }

     /**
     *@Route("/counter/{id}",name ="admin.counter.delete",  methods = "DELETE")
     *@param Counter $counter
     * 
     */
    public function delete(Counter $counter)
    {
            $em = $this->getDoctrine()->getManager();
            $em->remove($counter);
            $em->flush();
            $this->addFlash("success", "Deleted with succes ");
            return $this->redirectToRoute("admin.counter.index");

    }  
}
