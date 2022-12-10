# Create Dotnet Version

This action created various versions based on the [Semantic Versioning 2.0.0](https://semver.org/) specification.

## Dotnet Versioning

This project follow the below versioning guidelines.

| Version              | Format                                      | Description |
| -------------------- | ------------------------------------------- | ----------- |
| AssemblyVersion      | `major.minor.0.0`                           | Scoped to only major and minor version changes. Indicates backward compatibility. |
| FileVersion          | `major.minor.patch.build`                   | Includes a patch and build numer, indicating the exact version of the application. |
| InformationalVersion | `major.minor.patch[-pre-release]`           | Includes a pre-release identifier. This is the informational version used to communicate. |
| PackageVersion       | `major.minor.patch[-pre-release]+commit-id` | Includes the commit id. This is the most specific version and has a direct reference to the github commit. |

[Versioning and .NET Libraries](https://docs.microsoft.com/en-us/dotnet/standard/library-guidance/versioning)

## Inputs

### `baseversion`

**Required** version value used to generate the other version attributes.

Example values are:

- `v1.0.0`
- `1.0.0`
- `v1.0.0-beta`
- `1.0.0-rc.1`

**Note :** The 'v' character is trimmed during the processing.

## Outputs

### `version-assembly`

The version according to the `AssemblyVersion` format.

### `version-file`

The version according to the `FileVersion` format.

### `version-informational`

The version according to the `InformationalVersion` format.

### `version-package`

The version according to the `PackageVersion` format.

### `buildnumber`

The unique build number generated during the action.

## Example usage

### Using the action in a workflow job

Add the following step to your job referencing the repository and action folder you want to use.

Either use a *tag* (prefered) or *branch* name for the `{ref}`. This makes sure that changes do not potentially effect your build.

```yaml
- name: Get version from tag
  id: dotnet-versions
  uses: martijnvanschie/github-actions/create-dotnet-versions@{ref}
  with: 
    baseversion: '1.2.3-beta.1'
```
Example ref uaing tag:

```yaml
uses: martijnvanschie/github-actions/create-dotnet-versions@main
```

Example ref uaing tag:

```yaml
uses: martijnvanschie/github-actions/create-dotnet-versions@v1.0.0-rc.1
```

### Reading the output parameteres

The following step displays the versions returned by the action

```yaml
- name: Echo all version outputs
  run: |
    echo version-assembly = ${{ steps.dotnet-versions.outputs.version-assembly }} 
    echo version-file = ${{ steps.dotnet-versions.outputs.version-file }}
    echo version-informational = ${{ steps.dotnet-versions.outputs.version-informational }}
    echo version-package = ${{ steps.dotnet-versions.outputs.version-package }}
    echo buildnumber = ${{ steps.dotnet-versions.outputs.buildnumber }}
```

## used packages

[@actions/core](https://www.npmjs.com/package/@actions/core)

[@actions/github](https://www.npmjs.com/package/@actions/github)

