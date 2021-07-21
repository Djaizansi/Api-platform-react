<?php

namespace App\DataFixtures;

use App\Entity\Article;
use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;


class TagsArticlesFixtures extends Fixture implements DependentFixtureInterface
{

    public function load(ObjectManager $manager)
    {
        $articles = $manager->getRepository(Article::class)->findAll();
        $tags = $manager->getRepository(Tag::class)->findAll();
        foreach ($articles as $article) {
            for ($i=0; $i<rand(0, count($tags)); $i++){
                $article->addTag($tags[$i]);
            }
            $manager->flush();
        }
    }

    public function getDependencies()
    {
        return array(
            ArticlesFixtures::class,
            TagsFixtures::class
        );
    }
}
