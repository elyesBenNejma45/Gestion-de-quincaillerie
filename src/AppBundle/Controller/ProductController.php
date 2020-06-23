<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Product;
use AppBundle\Entity\Category;
use AppBundle\Form\ProductType;
use AppBundle\Form\EditProductType;
use Symfony\Component\HttpFoundation\Request;
use CMEN\GoogleChartsBundle\GoogleCharts\Charts\BarChart;
use CMEN\GoogleChartsBundle\GoogleCharts\Charts\PieChart;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CMEN\GoogleChartsBundle\GoogleCharts\Charts\Histogram;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use CMEN\GoogleChartsBundle\GoogleCharts\Charts\SankeyDiagram;

class ProductController extends Controller
{

    /**
     * 
     * @Route("/admin/ProductByUser", name="admin.product.index")
     * 
     */
    public function listAction(Request $request)
    {

        $products = $this->getDoctrine()
        ->getRepository(Product::class)
        ->findAllByPagination();
        /** 
         * @var $paginator \Knp\Component\pager\Paginator;
         */
        $paginator = $this->get('knp_paginator');

        $pagination = $paginator->paginate(
            $products, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            5 /*limit per page*/
        );
    
        // parameters to template
        return $this->render('AppBundle:Products:indexProduct.html.twig', ['products' => $pagination]);
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
            $quantity = $form->get('quantity')->getData();        
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

            if ($quantity>0) {
                $product->setStatus('available');
            } else {
                $product->setStatus('unaivailable');
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
            $quantity = $form->get('quantity')->getData();        
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
            if ($quantity>0) {
                $product->setStatus('available');
            } else {
                $product->setStatus('unaivailable');
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

    /**
     * @Route("/searchProduct/{id}", name="admin.product.searchProduct")
     */
    public function searchProductAction(Request $request)
    {
        // replace this example code with whatever you need
        $searchId =  $request->get('id');
        $products = $this->getDoctrine()
        ->getRepository(Product::class)
        ->findAllBySubCategory($searchId);
        $em = $this->getDoctrine()->getManager(); 
        $categories = $em->getRepository(Category::class)->findAll();
        return $this->render('AppBundle:Products:indexSearchProduct.html.twig', [
            "products" => $products,
            "categories" => $categories            

        ]);
    }
    /**
     * @Route("/showProductDetails/{id}", name="admin.product.showProductDetails")
     */
    public function showProductDetailsAction(Request $request)
    {
        // replace this example code with whatever you need
        $productId =  $request->get('id');
        $product = $this->getDoctrine()
        ->getRepository(Product::class)
        ->find($productId);
        $em = $this->getDoctrine()->getManager(); 
        $categories = $em->getRepository(Category::class)->findAll();
        return $this->render('AppBundle:Products:showDetailsProduct.html.twig', [
            "product" => $product,
            "categories" => $categories            

        ]);
    }
    /**
     * @Route("/showProductStats", name="admin.product.showProductStats")
     */
    public function ProductStatisticsAction()
    {

        $count =0;
        $countu = 0;
        $pieChart = new PieChart();
        $em = $this->getDoctrine()->getManager();
        $availableProducts = $em->getRepository(Product::class)->findAvailaibleProduct();
        $unvailableProducts = $em->getRepository(Product::class)->findNotAvailaibleProduct();
        for ($i = 0; $i <= sizeof($availableProducts); $i++) {
            $count +=1;
        }
        for ($j= 0; $j <= sizeof($unvailableProducts); $j++) {
            $countu +=1;
        }        
            $pieChart->getData()->setArrayToDataTable(
                [
                    
                    ['availability', 'percentage'],
                    [ 'available', $count ],
                    [ 'unavailable', $countu ],

                ]
            );
         

        $pieChart->getOptions()->setPieSliceText('label');
        $pieChart->getOptions()->setTitle('Product Availability');
        $pieChart->getOptions()->setPieStartAngle(100);
        $pieChart->getOptions()->setHeight(500);
        $pieChart->getOptions()->setWidth(900);
        $pieChart->getOptions()->getLegend()->setPosition('none');
    
        $bar = new BarChart();
        $bar->getData()->setArrayToDataTable([
            ['availability', 'percentage'],
            [ 'available', $count ],
            [ 'unavailable', $countu ],
        ]);
        $bar->getOptions()->setTitle('Product Availability');
        $bar->getOptions()->getHAxis()->setTitle('Product Availability');
        $bar->getOptions()->getHAxis()->setMinValue(0);
        $bar->getOptions()->getVAxis()->setTitle('Product');
        $bar->getOptions()->setWidth(900);
        $bar->getOptions()->setHeight(500);
        return $this->render('AppBundle:Products:showProductStats.html.twig', array('piechart' => $pieChart, 'bar' => $bar));
    }    
}
