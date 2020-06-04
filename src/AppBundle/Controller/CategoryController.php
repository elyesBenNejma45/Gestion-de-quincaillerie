<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Category;
use AppBundle\Form\CategoryType;
use AppBundle\Form\EditCategoryType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class CategoryController extends Controller
{
   
    /**
     * 
     * @Route("/admin/showCategory", name="admin.category.index")
     * 
     */
    public function indexAdmin()
    {
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository(Category::class)->findAll();
        return $this->render("AppBundle:Category:indexCategory.html.twig", compact("categories"));
    }
    
    /**
     * 
     *@Route("/admin/category/new",name ="admin.category.add")
     * 
     */
    public function new(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $em->persist($category);
            $em->flush();            
            $this->addFlash("success", "Added with success ");
            return $this->redirectToRoute("admin.category.index");
        }
        return $this->render("AppBundle:Category:addCategory.html.twig", [
            "category" => $category,
            "form" => $form->createView()
        ]);
    }
    /**
     * 
     *@Route("/admin/category/{id}",name ="admin.category.edit", methods = "GET|POST") 
     *@param Category $category
     *@param Request $request
     *return Symfony\Component\HttpFoundation\Response
     */
    public function edit(Category $category,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(EditCategoryType::class, $category);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $em->flush();
            $this->addFlash("success", "modified with succes ");
            return $this->redirectToRoute("admin.category.index");
        }
        return $this->render("AppBundle:Category:editCategory.html.twig", [
            "category" => $category,
            "form" => $form->createView()
        ]);
    }

     /**
     *@Route("/admin/category/{id}",name ="admin.category.delete",  methods = "DELETE")
     *@param Category $category
     * 
     */
    public function delete(Category $category,Request $request)
    {
            $em = $this->getDoctrine()->getManager();
            $em->remove($category);
            $em->flush();
            $this->addFlash("success", "Deleted with succes ");
            return $this->redirectToRoute("admin.category.index");

    }
}    

