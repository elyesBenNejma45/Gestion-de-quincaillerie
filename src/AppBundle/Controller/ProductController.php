<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Product;
use AppBundle\Form\ProductType;
use AppBundle\Form\EditProductType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class ProductController extends Controller
{

    /**
     * 
     * @Route("/admin/ProductByUser", name="admin.product.index")
     * 
     */
    public function indexAdmin()
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $user = $this->getUser();        
        $products =  $this->getDoctrine()->getRepository(Product::class)->findAll();
        return $this->render("AppBundle:Products:indexProduct.html.twig", compact("products"));
    }
    
    /**
     * 
     *@Route("/admin/product/new",name ="admin.product.add")
     * 
     */ 
    public function new(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $product = new Product();
        $form = $this->createForm(ProductType::class, $product);
        $form->handleRequest($request);
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $user = $this->getUser();
        $product->setUser($user);
        
        if($form->isSubmitted() && $form->isValid()){
            $image = $form->get('image')->getData();        
            if($image) {
                $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$image->guessExtension();
                // this is needed to safely include the file name as part of the URL
                    $image->move(
                        $this->getParameter('images_directory'),
                        $newFilename
                    );
                    // ... handle exception if something happens during file upload

                // updates the 'brochureFilename' property to store the PDF file name
                // instead of its contents
                $product->setImage($newFilename);
            }
            $em->persist($product);
            $em->flush();            
            $this->addFlash("success", "Added with success ");
            return $this->redirectToRoute("admin.product.index");
        } 
        return $this->render("AppBundle:Products:addProduct.html.twig", [
            "product" => $product,
            "form" => $form->createView()
        ]);
    }
    /**
     * 
     *@Route("/admin/product/{id}",name ="admin.product.edit", methods = "GET|POST") 
     *@param Product $product
     *@param Request $request
     *return Symfony\Component\HttpFoundation\Response
     */
    public function edit(Product $product,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(EditProductType::class, $product);
        $form->handleRequest($request);
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $user = $this->getUser();
        $product->setUser($user);
                
        if($form->isSubmitted()&& $form->isValid()){
            $image = $form->get('image')->getData();        
            if($image) {
                $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$image->guessExtension();
                // this is needed to safely include the file name as part of the URL
                    $image->move(
                        $this->getParameter('images_directory'),
                        $newFilename
                    );
                    // ... handle exception if something happens during file upload

                // updates the 'brochureFilename' property to store the PDF file name
                // instead of its contents
                $product->setImage($newFilename);
            }
            $em->flush();
            $this->addFlash("success", "modified with succes ");
            return $this->redirectToRoute("admin.product.index");
        }
        return $this->render("AppBundle:Products:editProduct.html.twig", [
            "product" => $product,
            "form" => $form->createView()
        ]);
    }

     /**
     *@Route("/admin/product/{id}",name ="admin.product.delete",  methods = "DELETE")
     *@param Product $product
     * 
     */
    public function delete(Product $product)
    {
            $em = $this->getDoctrine()->getManager();
            $em->remove($product);
            $em->flush();
            $this->addFlash("success", "Deleted with succes ");
            return $this->redirectToRoute("admin.product.index");

    }     
}
