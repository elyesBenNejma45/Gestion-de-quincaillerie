<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class EditCommandeType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('comNum');
        $builder->add('dateComm',DateType::class,['label' => 'Date Commande:   : ','widget' => 'single_text']);
        $builder->add('observation', TextType::class, array('label' => 'Observation : '));
        $builder->add('totht', TextType::class, array('label' => 'Total Ht : '));
        $builder->add('tottva', TextType::class, array('label' => 'Total Tva : '));
        $builder->add('totttc', TextType::class, array('label' => 'Total TTC :'));
        $builder->add('client', EntityType::class ,
        array('class'=>'AppBundle:Client',
        'choice_label' =>'firstname', 'label'=>'')
       
        );     

        $builder->add('Edit', SubmitType::class

    );


    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Commande'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_editcommande';
    }


}
