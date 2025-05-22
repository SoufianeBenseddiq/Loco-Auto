<?php
require('./fpdf/fpdf.php'); // Adjust the path to where you placed FPDF

class PDF extends FPDF {
    // Page header
    function Header() {
        // Arial bold 15
        $this->SetFont('Arial', 'B', 15);
        // Move to the right
        $this->Cell(80);
        // Title
        $this->Cell(30, 10, 'Reçu de Réservation', 0, 1, 'C');
        // Line break
        $this->Ln(20);
    }

    // Page footer
    function Footer() {
        // Position at 1.5 cm from bottom
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial', 'I', 8);
        // Page number
        $this->Cell(0, 10, 'Page ' . $this->PageNo(), 0, 0, 'C');
    }
}

if (isset($_GET['idRes'])) {
    $idRes = $_GET['idRes'];

    // Here you should fetch the reservation details from your database using $idRes
    // Example data
    $carData = [
        'libelle' => 'Car Model',
        'categorie' => 'Category',
        'prixJour' => '100',
        'dateDebut' => '2024-05-01',
        'dateFin' => '2024-05-10',
        'montantTotal' => '1000'
    ];

    // Instantiate the PDF object
    $pdf = new PDF();
    $pdf->AddPage();

    // Set title and details
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, 'LocoAuto', 0, 1);
    $pdf->Cell(0, 10, 'Mhammid 9 Marrakech', 0, 1);
    $pdf->Cell(0, 10, 'Tel : 06 99 01 65 17 / 06 84 71 16 37', 0, 1);
    $pdf->Ln(10); // Add a line break

    // Reservation information
    $pdf->SetFont('Arial', '', 12);
    foreach ($carData as $key => $value) {
        $pdf->Cell(0, 10, ucfirst($key) . ': ' . $value, 0, 1);
    }

    // Output the PDF
    $pdf->Output('I', 'recu_de_reservation.pdf');
} else {
    echo "No reservation ID provided.";
}
?>
