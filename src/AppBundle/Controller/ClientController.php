<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Client;
use AppBundle\Form\ClientType;
use AppBundle\Form\EditClientType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ClientController extends Controller
{
    /**
     * 
     * @Route("/showClient", name="admin.client.index")
     * 
     */
    public function indexAdmin()
    {
        $em = $this->getDoctrine()->getManager();
        $clients = $em->getRepository(Client::class)->findAll();
        return $this->render("AppBundle:Client:indexClient.html.twig", compact("clients"));
    }
    
    /**
     * 
     *@Route("/client/new",name ="admin.client.add")
     * 
     */
    public function new(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $client = new Client();
        $form = $this->createForm(ClientType::class, $client);
        $form->handleRequest($request);
        $user = $this->getUser();
        $client->setUser($user);
        if($form->isSubmitted()&& $form->isValid()){
            $em->persist($client);
            $em->flush();            
            $this->addFlash("success", "Added with success ");
            return $this->redirectToRoute("admin.client.index");
        }
        return $this->render("AppBundle:Client:addClient.html.twig", [
            "client" => $client,
            "form" => $form->createView()
        ]);
    }
    /**
     * 
     *@Route("/client/{id}",name ="admin.client.edit", methods = "GET|POST") 
     *@param Client $client
     *@param Request $request
     *return Symfony\Component\HttpFoundation\Response
     */
    public function edit(Client $client,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(EditClientType::class, $client);
        $form->handleRequest($request);
        $user = $this->getUser();
        $client->setUser($user);
        if($form->isSubmitted()&& $form->isValid()){
            $em->flush();
            $this->addFlash("success", "modified with succes ");
            return $this->redirectToRoute("admin.client.index");
        }
        return $this->render("AppBundle:Client:editClient.html.twig", [
            "client" => $client,
            "form" => $form->createView()
        ]);
    }

     /**
     *@Route("/client/{id}",name ="admin.client.delete",  methods = "DELETE")
     *@param Client $client
     * 
     */
    public function delete(Client $client)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($client);
        $em->flush();
        $this->addFlash("success", "Deleted with succes ");
        return $this->redirectToRoute("admin.client.index");

    }      
}
