<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medicine>
 */
class MedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => ucfirst($this->faker->word) . 'cin',
            'packing' => $this->faker->randomElement(['SA', 'JO', 'PRC', 'USA']),
            'exp_date' => $this->faker->dateTimeBetween('now', '+3 years'),
            'in_stock' => $this->faker->numberBetween(1, 10)
        ];
    }
}
