<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Purchase>
 */
class PurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'voucher_number' => $this->generateUniqueNumber(),
            'supplier_id' => $this->faker->numberBetween(1, 18),
            'medicine_id' => $this->faker->numberBetween(1, 18),
            'status' => $this->faker->randomElement(['Pending', 'Successful', 'Cancelled',]),
        ];
    }

    public function generateUniqueNumber()
    {
        // Example: 4-digit unique number generation
        do {
            $uniqueNumber = mt_rand(1000, 9999); // Generate a random 10-digit number
        } while (\App\Models\Purchase::where('voucher_number', $uniqueNumber)->exists()); // Ensure uniqueness

        return $uniqueNumber;
    }
}
