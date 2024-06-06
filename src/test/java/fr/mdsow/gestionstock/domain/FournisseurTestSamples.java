package fr.mdsow.gestionstock.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class FournisseurTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Fournisseur getFournisseurSample1() {
        return new Fournisseur().id(1L).nom("nom1").adresse("adresse1").contact("contact1").age(1);
    }

    public static Fournisseur getFournisseurSample2() {
        return new Fournisseur().id(2L).nom("nom2").adresse("adresse2").contact("contact2").age(2);
    }

    public static Fournisseur getFournisseurRandomSampleGenerator() {
        return new Fournisseur()
            .id(longCount.incrementAndGet())
            .nom(UUID.randomUUID().toString())
            .adresse(UUID.randomUUID().toString())
            .contact(UUID.randomUUID().toString())
            .age(intCount.incrementAndGet());
    }
}
