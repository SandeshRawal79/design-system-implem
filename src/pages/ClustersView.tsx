import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardT
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
    serviceId: number
    provisionType: string

    addToSet: boolean
}
export function Clust
  const navigate =
  const [clusters, 
  const [wholeCluster
  const [setName, setSe
  const [distance, setDis
  // Extract query 
  const distanceParam
  useEffect(() => {
    const mockCluster
    
 

            serviceName: "Produc
            options: "8773",
            setsInNow: 0,
          },
            abcdTup: "575",
            serviceName: "Product Wide Provision",
  const [wholeCluster, setWholeCluster] = useState<boolean>(false)
  const [creator, setCreator] = useState<string>('')
  const [setName, setSetName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [distance, setDistance] = useState<string>('10.0')

  // Extract query parameters
  const dendrogram = searchParams.get('dendrogram') || '1'
  const distanceParam = searchParams.get('distance') || '10'

  useEffect(() => {
    // Simulate loading cluster data
    const mockClusters: ClusterData[] = [
      {
        clusterNumber: 1,
        recordCount: 270,
        records: [
          {
            abcdTup: "493",
            serviceId: 0,
            setsInNow: 0,
            provisionType: "Coverage Code Id",
            options: "8773",
            approved: false,
            serviceName: 
            addToSet: false
            
          {
            abcdTup: "575",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
          },
            abcdTup: "745",
            serviceName: 
            options: "8523"
          },
          {
            abcdTup: "757",
            serviceName: 
            options: "6476",
            setsInNow: 0,
          },
            abcdTup: "759",
            serviceName: 
            options: "8997"
            
          }
            abcdTup: "763",
            serviceName: 
            options: "8782",
            setsInNow: 0,
          },
            abcdTup: "772",
            serviceName: 
            options: "8143"
            
          }
            abcdTup: "780",
            serviceName: 
            options: "9015",
            setsInNow: 0,
          },
            abcdTup: "781",
            serviceName: 
            options: "8480"
            
          }
            abcdTup: "789",
            serviceName: 
            options: "8839",
            setsInNow: 0,
          }
      }
    setClusters(mockClust
  }, [distanceParam])
  const hand
  }
  const handleCheckboxChang
      prevClusters.map(cl
          ? {
              records: cluster.records.map((re
              )
          : cluster
    )

    const ne
    
      prevClusters.map(clus
          ? {
              records: cluster.records.map(record 
                addToSet: newWholeClusterState
            }
      )
  }
  const selectedClusterData
  return (
      {/* H
            abcdTup: "745",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
            options: "8523",
            approved: false,
            setsInNow: 0,
            addToSet: false
          },
          {
            abcdTup: "757",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
            options: "6476",
            approved: false,
            setsInNow: 0,
            addToSet: false
          },
          {
            abcdTup: "759",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
            options: "8997",
            approved: false,
            setsInNow: 0,
            addToSet: false
          },
          {
            abcdTup: "763",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
            options: "8782",
            approved: false,
            setsInNow: 0,
            addToSet: false
          },
          {
            abcdTup: "772",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
            options: "8143",
            approved: false,
            setsInNow: 0,
            addToSet: false
          },
          {
            abcdTup: "780",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
            options: "9015",
            approved: false,
            setsInNow: 0,
            addToSet: false
          },
          {
            abcdTup: "781",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
            options: "8480",
            approved: false,
            setsInNow: 0,
            addToSet: false
          },
          {
            abcdTup: "789",
            serviceId: 0,
            serviceName: "Product Wide Provision",
            provisionType: "Coverage Code Id",
            options: "8839",
            approved: false,
            setsInNow: 0,
            addToSet: false
          }
        ]
      }
    ]
    setClusters(mockClusters)
    setDistance(distanceParam)
  }, [distanceParam])

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleCheckboxChange = (recordIndex: number) => {
    setClusters(prevClusters =>
      prevClusters.map(cluster =>
        cluster.clusterNumber === selectedCluster
          ? {
              ...cluster,
              records: cluster.records.map((record, index) =>
                index === recordIndex ? { ...record, addToSet: !record.addToSet } : record
              )
            }
          : cluster
      )
    )
  }

  const handleWholeClusterChange = () => {
    const newWholeClusterState = !wholeCluster
    setWholeCluster(newWholeClusterState)
    
    setClusters(prevClusters =>
      prevClusters.map(cluster =>
        cluster.clusterNumber === selectedCluster
          ? {
              ...cluster,
              records: cluster.records.map(record => ({
                ...record,
                addToSet: newWholeClusterState
              }))
            }
          : cluster
      )
    )
  }

  const selectedClusterData = clusters.find(c => c.clusterNumber === selectedCluster)

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
                   
              variant="outline"
                    Add
              onClick={handleBackToDendrogram}
              className="back-to-dashboard flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to 3-dendrograms view
                    C
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-sm"></div>
              <h1 className="text-2xl font-bold text-foreground">
                Provision Intelligence Hub - Cluster Analysis
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Data Context Panel */}
                      onCheckedChange={ha
            <Card className="bg-card border border-border">
                      Whole cluster
                <CardTitle className="text-sm font-semibold">Data context:</CardTitle>
                </div>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">id=0</span>
                  <span className="text-muted-foreground"> name=Product Wide Provision</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Created:</span>
                  <span className="text-muted-foreground"> 2025-09-16 10:35:57</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">By:</span>
                  <span className="text-muted-foreground"> Mark</span>
                </div>
              </CardContent>
            </Card>
                

                        <td className="p
          <div className="lg:col-span-3">
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">X-ray Projection:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">Only Options (D)</div>
                <div className="text-sm">
                  <span className="font-medium">Total Clusters:</span>
                  <span className="text-muted-foreground"> 6</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Total Records:</span>
                  <span className="text-muted-foreground"> 3702</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Label className="text-sm font-medium">Distance Threshold:</Label>
  )
                    type="number"

                    onChange={(e) => setDistance(e.target.value)}
                    className="w-20 h-8"
                    step="0.1"

                  <Button size="sm" className="btn-gradient-primary h-8">
                    Update
                  </Button>

              </CardContent>
            </Card>
          </div>

          {/* Create Set Panel */}
          <div className="lg:col-span-6">
            <Card className="bg-amber-50 border border-amber-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">

                    <Label className="text-sm font-semibold">Creator:*</Label>

                      placeholder="Enter creator name"
                      value={creator}
                      onChange={(e) => setCreator(e.target.value)}
                      className="mt-1 bg-white"
                    />

                  <div className="text-right">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => {
                        // Handle select existing set logic
                        console.log('Select an existing set')
                      }}

                      Select an existing set
                    </Button>
                    <div className="text-xs text-muted-foreground mt-1">to add rows to it</div>
                    <div className="text-xs text-muted-foreground">Select set first</div>
                  </div>

                <div className="mt-4">
                  <Label className="text-sm font-semibold">Set Name:*</Label>
                  <Input
                    placeholder="Enter set name"
                    value={setName}
                    onChange={(e) => setSetName(e.target.value)}
                    className="mt-1 bg-white"

                </div>
                <div className="mt-4">
                  <Label className="text-sm font-semibold">Description:*</Label>
                  <Textarea
                    placeholder="Enter description (max 500 chars)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 bg-white h-20"
                    maxLength={500}

                </div>

              <CardContent>
                <div className="flex gap-2">
                  <Button 
                    className="bg-warning hover:bg-warning/90 text-white"
                    onClick={() => {
                      // Handle add rows to set logic
                      console.log('Add rows to set (select rows first)')


                    Add rows to set (select rows first)

                  <Button 
                    className="bg-warning hover:bg-warning/90 text-white"
                    onClick={() => {
                      // Handle create a set logic
                      console.log('Create a set (select rows first)')
                    }}
                  >
                    Create a set (select rows first)
                  </Button>
                </div>

            </Card>

        </div>

        {/* Cluster Table */}
        <div className="mt-6">
          <Card className="bg-card border border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">
                  Cluster {selectedCluster} of 6 ({selectedClusterData?.recordCount || 0} records)
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="whole-cluster"
                      checked={wholeCluster}
                      onCheckedChange={handleWholeClusterChange}
                    />
                    <Label htmlFor="whole-cluster" className="text-sm cursor-pointer">
                      Whole cluster
                    </Label>
                  </div>

              </div>

            <CardContent className="p-0">
              <div className="responsive-table-wrapper">
                <table className="responsive-table w-full">
                  <thead className="sticky-header">
                    <tr className="border-b border-border">
                      <th className="text-left">ABCD 1-Up</th>
                      <th className="text-left">Service ID</th>
                      <th className="text-left">Service Name</th>
                      <th className="text-left">Provision Type</th>
                      <th className="text-left">Options</th>
                      <th className="text-center">Approve</th>
                      <th className="text-center"># sets in now</th>
                      <th className="text-center">Add to set</th>
                    </tr>
                  </thead>

                    {selectedClusterData?.records.map((record, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Button variant="link" className="p-0 h-auto text-primary hover:underline">
                            {record.abcdTup}
                          </Button>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{record.serviceId}</td>
                        <td className="py-3 px-4 text-sm">{record.serviceName}</td>
                        <td className="py-3 px-4 text-sm">{record.provisionType}</td>
                        <td className="py-3 px-4 text-sm">{record.options}</td>
                        <td className="py-3 px-4 text-center">
                          {record.approved ? (
                            <Check size={16} className="text-success mx-auto" />
                          ) : (
                            <X size={16} className="text-destructive mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-sm">{record.setsInNow}</td>
                        <td className="py-3 px-4 text-center">
                          <Checkbox
                            checked={record.addToSet}
                            onCheckedChange={() => handleCheckboxChange(index)}

                        </td>
                      </tr>
                    ))}

                </table>

            </CardContent>

        </div>

    </div>

}