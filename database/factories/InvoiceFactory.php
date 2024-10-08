<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_id' => $this->faker->numberBetween(1, 18),
            'medicine_id' => $this->faker->numberBetween(1, 18),
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'quantity' => 1
        ];
    }
}
