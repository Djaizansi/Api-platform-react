<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $faker;
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $this->faker = Factory::create('fr_FR');
        //User
        for ($i = 0; $i < 100; $i++) {
            $user = new User();
            $user->setEmail($this->faker->email)
                ->setPassword($this->encoder->encodePassword($user, 'azerty'))
                ->setUsername($this->faker->firstName)
                ->setName($this->faker->name);
            $manager->persist($user);
        }
        //Admin
        $user = new User();
        $user->setEmail("youcef.jallali@gmail.com")
            ->setPassword($this->encoder->encodePassword($user, 'azerty'))
            ->setUsername("Djaizansi")
            ->setRoles(["ROLE_ADMIN"])
            ->setName("Youcef Jallali");
        $manager->persist($user);

        $manager->flush();
    }
}
