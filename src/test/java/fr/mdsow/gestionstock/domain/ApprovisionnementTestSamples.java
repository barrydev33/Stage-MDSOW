package fr.mdsow.gestionstock.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class ApprovisionnementTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Approvisionnement getApprovisionnementSample1() {
        return new Approvisionnement().id(1L).quantite(1L);
    }

    public static Approvisionnement getApprovisionnementSample2() {
        return new Approvisionnement().id(2L).quantite(2L);
    }

    public static Approvisionnement getApprovisionnementRandomSampleGenerator() {
        return new Approvisionnement().id(longCount.incrementAndGet()).quantite(longCount.incrementAndGet());
    }
}
