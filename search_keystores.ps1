$userProfile = [System.Environment]::GetFolderPath('UserProfile')
$targetFolders = @(
    "a:\ProgramLife\APP\Finotary",
    "$userProfile\Desktop",
    "$userProfile\Downloads",
    "$userProfile\Documents"
)

# Identify external/backup drives (drives other than C: and A: which might be main drives here)
$allDrives = Get-PSDrive -PSProvider FileSystem | Select-Object -ExpandProperty Root
foreach ($drive in $allDrives) {
    if ($drive -ne "C:\" -and $drive -ne "A:\") {
        $targetFolders += $drive
    }
}

Write-Output "Scanning the following locations recursively:"
$targetFolders | ForEach-Object { Write-Output " - $_" }
Write-Output "------------------------------------------------`n"

$results = @()

foreach ($folder in $targetFolders) {
    if (Test-Path $folder) {
        Write-Output "Scanning $folder..."
        try {
            $foundFiles = Get-ChildItem -Path $folder -Include *.jks, *.keystore -Recurse -ErrorAction SilentlyContinue -Force
            if ($foundFiles) {
                foreach ($file in $foundFiles) {
                    $results += "$($file.FullName) | Size: $($file.Length) bytes | Modified: $($file.LastWriteTime)"
                }
            }
        } catch {
            # Ignore errors
        }
    }
}

if ($results.Count -gt 0) {
    Write-Output "`n=== MATCHES FOUND ==="
    $results | ForEach-Object { Write-Output $_ }
} else {
    Write-Output "`n=== NO MATCHES FOUND ==="
}
