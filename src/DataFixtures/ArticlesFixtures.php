<?php

namespace App\DataFixtures;

use App\Entity\Article;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\String\Slugger\SluggerInterface;

class ArticlesFixtures extends Fixture implements DependentFixtureInterface
{
    private $faker;
    private $slugger;

    public function __construct(SluggerInterface $slugger)
    {
        $this->slugger = $slugger;
    }

    public function load(ObjectManager $manager)
    {
        $this->faker = Factory::create('fr_FR');
        $users = $manager->getRepository(User::class)->findAll();
        foreach($users as $user){
            for ($i = 0; $i < 80; $i++){
                $title = $this->faker->word;
                $article = new Article();
                $article->setTitle($title)
                    ->setSlug($this->slugger->slug(strtolower($title). '-' .uniqid()))
                    ->setContent($this->faker->paragraph(3,$variableNbSentences = true))
                    ->setIsPublished(true)
                    ->setPublishedAt(new \DateTime())
                    ->setAuthor($user);
                $manager->persist($article);
            }
        }
        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
        );
    }
}
