<?php

namespace App\DataFixtures;

use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;


class TagsFixtures extends Fixture
{
    private $faker;
    public function load(ObjectManager $manager )
    {
        $this->faker = Factory::create();
        $fakeTags = $this->faker->words(10,  false);
        $fakeTags = array_unique($fakeTags);
        foreach ($fakeTags as $fakeTag ) {
            $tag = (new Tag())
                ->setLabel($fakeTag);
            $manager->persist($tag);
        }
        $manager->flush();
    }
}
