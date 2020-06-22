<?php

namespace AppBundle\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;
use AppBundle\Entity\Counter;
use AppBundle\Entity\Product;
use AppBundle\Entity\Commande;
use AppBundle\Entity\Lcommande;
use AppBundle\Form\CommandeType;
use AppBundle\Form\LcommandeType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class CommandeController extends Controller
{
    /**
     * @Route("/commandes", name="admin.commande.index", methods="GET")
     */
    public function index(Request $request): Response
    {
        $session = $request->getSession();
        $em = $this->getDoctrine()->getManager();
        $name = $session->get('name');
        $commandes = $em->getRepository(Commande::class)->findAll();
        return $this->render('AppBundle:Commande:indexCommande.html.twig', ['name'=>$name,
            'commandes' => $commandes,
        ]);
    }
       
    
    /**
     * @Route("/commande/listec", name="admin.commande.indexList")
     */
    public function listec(Request $request)
    {
        $session = $request->getSession();

        $name = $session->get('name');
        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'Arial');
        
        // Instantiate Dompdf with our options
        $dompdf = new Dompdf($pdfOptions);
        $em = $this->getDoctrine()->getManager();
        $commandes = $em->getRepository(Commande::class)->findAll();           
        
        // Retrieve the HTML generated in our twig file
        $html = $this->renderView('AppBundle:Commande:indexListeCommande.html.twig', [
            'commandes' => $commandes,
        
        ]);
        
        // Load HTML to Dompdf
        $dompdf->loadHtml($html);
        
        // (Optional) Setup the paper size and orientation 'portrait' or 'portrait'
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser (force download)
        $dompdf->stream("mypdf.pdf", [
            "Attachment" => false
        ]);

    }

    /**
     * @Route("/commande/new", name="admin.commande.new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $session = $request->getSession();
        
        $em = $this->getDoctrine()->getManager();
        $name = $session->get('name');
        $compteur = $em->getRepository(Counter::class)->find(1);
        $numc= $compteur->getCountNum();
        $commande = new Commande();
        $form = $this->createForm(CommandeType::class, $commande);
        $form->handleRequest($request);
        $lcommande = new LCommande();
        $f = $this->createForm(LcommandeType::class, $lcommande);
        $f->handleRequest($request);
        $totht = 0;
        $totva = 0;
        $totttc = 0;
        $montht = 0;
        $lig = 0;
       
        if (!$session->has('commande'))
            {
                $session->set('commande',array());
                
            }
            $session = $request->getSession();
            $name = $session->get('name');
            $choix = "";
        $Tabcomm = $session->get('commande', []);
       
        if ($form->isSubmitted() || $f->isSubmitted()) {
        
            $choix = $request->get('bt');
            if($choix =="Valider"){
            $lig = sizeof($Tabcomm);
            for ($i = 1;$i<=$lig;$i++)
            {
            $lcommande = new Lcommande();
            $prod = $em->getRepository(Product::class)->findOneBy(array('id'=>$Tabcomm[$i]->getProduct()));
            $lcommande->setProduct($prod);
            $lcommande->setLig($i);
            $lcommande->setCountNum($numc);
            $lcommande->setQuantity($Tabcomm[$i]->getQuantity());
            $lcommande->setTva($prod->getTva());
            $em->persist($lcommande);
            $em->flush();
            $montht = $Tabcomm[$i]->getQuantity() * $prod->getPrice();
            $monttva = $montht *$prod->getTva()*0.01;
            $totht = $totht + $montht;
            $totva = $totva + $monttva;
            $totttc = $totttc + ($totht + $totva);
            }
            
            $commande->setComNum($numc);
            $commande->setTotht($totht);
            $commande->setTottva($totva);
            $commande->setTotttc($totttc);
            $user = $this->getUser();
            $commande->setUser($user);            
            $em->persist($commande);
            $compteur->setCountNum($numc+1);
            $em->persist($compteur);
            $em->flush();
            $this->addFlash("success", "Added with success ");
            $session->clear();
            return $this->redirectToRoute("admin.commande.index");
        } else if ($choix =="Add"){
            $lig = sizeof($Tabcomm)+1;
            $lcommande->setCountNum($numc);
            $lcommande->setLig($lig);
            $Tabcomm[$lig] = $lcommande;
            $session->set('commande',$Tabcomm);
             }  
        }
        return $this->render('AppBundle:Commande:addCommande.html.twig', [
            'commande' => $commande,'lcomm'=>$Tabcomm,
            'form' => $form->createView(),
            'lcommande' => $lcommande,'name'=>$name,
            'f' => $f->createView(),'numc'=>$numc,
            'totht'=>$totht,'totva'=>$totva,
            'totttc'=>$totttc,'montht'=>$montht,'lig'=>$lig,

        ]);
        
    }

    /**
     * @Route("/commande/{id}", name="admin.commande.delete", methods="DELETE")
     */
    public function delete(Request $request, Commande $commande): Response
    {
        if ($this->isCsrfTokenValid('delete'.$commande->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($commande);
            $entityManager->flush();
        }

        return $this->redirectToRoute('admin.commande.index');
    }


    /**
     * @Route("/commande/lcommandes/{id}", name="admin.commande.ShowLcommande", methods="GET")
     *@param Commande $commande
     *@param Request $request
     *return Symfony\Component\HttpFoundation\Response
     */
    public function showLcommandesOfCommande(Request $request)
    {
        $searchId =  $request->get('id');
        $em = $this->getDoctrine()->getManager();  
        $commande = $em->getRepository(Commande::class)->find($searchId);
        $lcommandes = $em->getRepository(Lcommande::class)->findAllByCommandeNumber($searchId);
        return $this->render('AppBundle:Commande:indexListeCommande.html.twig', 
        [
            'commande'=>$commande,
            'lcommandes' => $lcommandes,
        ]);
    }
    /**
     * @Route("/commande/lcommandesPdf/{id}", name="admin.commande.ShowLcommandePdf", methods="GET")
     *@param Commande $commande
     *@param Request $request
     *return Symfony\Component\HttpFoundation\Response
     */
    public function showLcommandesOfCommandePdf(Request $request)
    {
        $searchId =  $request->get('id');
        $em = $this->getDoctrine()->getManager();  
        $commande = $em->getRepository(Commande::class)->find($searchId);
        $lcommandes = $em->getRepository(Lcommande::class)->findAllByCommandeNumber($searchId);
        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'Arial');
        $dompdf = new Dompdf($pdfOptions);
        $html = $this->renderView('AppBundle:Commande:indexLcommande.html.twig', [
            'commande' => $commande,
            'lcommandes' => $lcommandes
        
        ]);
        $html .= '<link type="text/css" href="/build/comm.css" rel="stylesheet" />';
        $html .= '<link type="text/css" href="/build/printCom.css" rel="stylesheet" />';

        $dompdf->loadHtml($html);
        
        // (Optional) Setup the paper size and orientation 'portrait' or 'portrait'
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser (force download)
        $dompdf->stream("mypdf.pdf", [
            "Attachment" => false
        ]);        
    }    
    /**
     * @Route("/supprime/{id}", name="supprime")
     */

    public function supprime($id, Request $request){
        $session = $request->getSession();
        $Tabcomm= $session->get('commande', []);
        if (array_key_exists($id, $Tabcomm))
        {
            unset($Tabcomm[$id]);
            $session->set('commande',$Tabcomm);
        }
        return $this->redirectToRoute('admin.commande.new'); 

    }
}
