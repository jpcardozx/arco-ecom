# Script to fix double createHref calls
# This will replace createHref(createHref("...")) with createHref("...")

# Create temp directory if it doesn't exist
if (-not (Test-Path -Path "temp")) {
    New-Item -ItemType Directory -Path "temp"
}

# Files to process
$files = Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    Write-Host "Processing $file..."
    
    # Read the file content
    $content = Get-Content $file -Raw
    
    # Check if the file contains any double createHref calls
    if ($content -match 'createHref\(createHref\(') {
        Write-Host "Found double createHref in $file"
        
        # Replace double createHref calls
        $content = $content -replace 'createHref\(createHref\((.*?)\)\)', 'createHref($1)'
        
        # Write the content to a temporary file
        $content | Set-Content "temp\$(Split-Path $file -Leaf)"
        
        # Replace the original file if the temp file was created successfully
        if (Test-Path "temp\$(Split-Path $file -Leaf)") {
            Copy-Item "temp\$(Split-Path $file -Leaf)" -Destination $file -Force
            Write-Host "Updated $file"
        } else {
            Write-Host "Failed to process $file"
        }
    }
}

# Clean up
Remove-Item -Path "temp" -Recurse -Force

Write-Host "All files processed successfully!"
