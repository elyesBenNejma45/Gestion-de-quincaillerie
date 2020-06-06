<?php

namespace AppBundle\Controller;

use AppBundle\Entity\SubCategory;
use AppBundle\Form\SubCategoryType;
use AppBundle\Form\EditSubCategoryType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class SubCategoryController extends Controller
{
   
    /**
     * 
     * @Route("/admin/showsubcategory", name="admin.subcategory.index")
     * 
     */
    public function indexAdmin()
    {
        $em = $this->getDoctrine()->getManager();
        $subcategories = $em->getRepository(SubCategory::class)->findAll();
        return $this->render("AppBundle:SubCategory:indexSubCategory.html.twig", compact("subcategories"));
    }
    
    /**
     * 
     *@Route("/admin/subcategory/new",name ="admin.subcategory.add")
     * 
     */
    public function new(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $subcategory = new SubCategory();
        $form = $this->createForm(SubCategoryType::class, $subcategory);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $em->persist($subcategory);
            $em->flush();            
            $this->addFlash("success", "Added with success ");
            return $this->redirectToRoute("admin.subcategory.index");
        }
        return $this->render("AppBundle:SubCategory:addSubCategory.html.twig", [
            "subcategory" => $subcategory,
            "form" => $form->createView()
        ]);
    }
    /**
     * 
     *@Route("/admin/subcategory/{id}",name ="admin.subcategory.edit", methods = "GET|POST") 
     *@param SubCategory $subcategory
     *@param Request $request
     *return Symfony\Component\HttpFoundation\Response
     */
    public function edit(SubCategory $subcategory,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(EditSubCategoryType::class, $subcategory);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $em->flush();
            $this->addFlash("success", "modified with succes ");
            return $this->redirectToRoute("admin.subcategory.index");
        }
        return $this->render("AppBundle:SubCategory:editSubCategory.html.twig", [
            "subcategory" => $subcategory,
            "form" => $form->createView()
        ]);
    }

     /**
     *@Route("/admin/subcategory/{id}",name ="admin.subcategory.delete",  methods = "DELETE")
     *@param SubCategory $subcategory
     * 
     */
    public function delete(SubCategory $subcategory)
    {
            $em = $this->getDoctrine()->getManager();
            $em->remove($subcategory);
            $em->flush();
            $this->addFlash("success", "Deleted with succes ");
            return $this->redirectToRoute("admin.subcategory.index");

    }    
}
