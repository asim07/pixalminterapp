import React from "react";
import uniqId from "uniqid";
import styled, { css } from "styled-components";
import {
  faTrash,
  faArrowDown,
  faArrowUp,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeb3 } from "@3rdweb/hooks";
import { ContainerSM, Button, TextField, Select } from "components/elements";
import Upload from "./Upload";

type Props = {
  onGenerate?: any;
};

const NewProject: React.FC<Props> = ({ onGenerate }) => {
  const { address } = useWeb3();

  const [layers, setLayers] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [preview, setPreview] = React.useState(null);

  const handleProcessGenerating = () => onGenerate({ layers, items });

  const handleLayerCollapse = (id) => {
    const restLayers = layers.filter((x) => x.id !== id);
    const currentLayer = layers.filter((x) => x.id === id)[0];
    currentLayer.collapsed = !currentLayer.collapsed;

    const newLayers = [...restLayers, currentLayer];
    const sortedLayers = newLayers.sort((a, b) => b.order - a.order);

    setLayers(sortedLayers);
  };

  const handleLayerUp = (id) => {
    const layerIndex = layers.map((layer) => layer.id).indexOf(id);
    if (layerIndex === 0) return;

    const currentLayer = layers[layerIndex];
    const prevLayer = layers[layerIndex - 1];
    const restLayers = layers.filter(
      (x) => x.id !== id && x.id !== prevLayer.id
    );
    currentLayer.order += 1;
    if (prevLayer) prevLayer.order -= 1;

    const newLayers = [...restLayers, prevLayer && prevLayer, currentLayer];
    const sortedLayers = newLayers.sort((a, b) => b.order - a.order);

    setLayers(sortedLayers);
  };

  const handleLayerDown = (id) => {
    const layerIndex = layers.map((layer) => layer.id).indexOf(id);
    if (layerIndex > layers.length - 2) return;

    const currentLayer = layers[layerIndex];
    const nextLayer = layers[layerIndex + 1];
    const restLayers = layers.filter(
      (x) => x.id !== id && x.id !== nextLayer.id
    );
    currentLayer.order -= 1;
    if (nextLayer) nextLayer.order += 1;

    const newLayers = [...restLayers, nextLayer && nextLayer, currentLayer];
    const sortedLayers = newLayers.sort((a, b) => b.order - a.order);

    setLayers(sortedLayers);
  };

  const handleLayerDelete = (id) => {
    const newLayers = [...layers.filter((x) => x.id !== id)];
    newLayers.forEach((layer, index) => {
      newLayers[index].order = newLayers.length - index;
    });
    setLayers(newLayers);
  };

  const handleItemChange = (e) => {
    const { value, name } = e.target;
    const id = e.target.getAttribute("id");

    const itemIndex = items.map((x) => x.id).indexOf(id);
    const newItems = [...items];
    newItems[itemIndex][name] = value;

    setItems(newItems);
  };

  const handleRarityChange = (e) => {
    const { value } = e.target;
    const id = e.target.getAttribute("id");

    const itemIndex = items.map((x) => x.id).indexOf(id);
    const newItems = [...items];
    newItems[itemIndex].rarity = value;

    setItems(newItems);
  };

  const handleRandomizePreview = () => {
    const allLayersIds = layers.map((x) => x.id);
    const setOfRandomLayers = [];

    allLayersIds.reverse().forEach((layerId) => {
      const layerItems = items.filter((item) => item.layerId === layerId);
      const randomIndex = Math.floor(Math.random() * layerItems.length);
      setOfRandomLayers.push({
        image: layerItems[randomIndex]?.image,
        id: layerItems[randomIndex]?.id,
        layerId: layerId,
      });
    });

    setPreview(setOfRandomLayers);
  };

  const handleSelectItem = ({ id, image, layerId }) => {
    const currentItemIndex = layers.map((x) => x.id).indexOf(layerId);
    if (currentItemIndex < 0) return;

    // const restPreviews = preview.filter((x) => x.layerId !== layerId);
    // const currentPreview = preview.filter((x) => x.layerId === layerId)[0];
    // currentPreview.id = id;
    // currentPreview.image = image;
    // currentPreview.layerId = layerId;
    // const sortedPreviews = [...restPreviews, currentPreview].sort(
    //   (a, b) =>
    //     layers.filter((x) => x.id === b.layerId)[0].order -
    //     layers.filter((x) => x.id === a.layerId)[0].order
    // );

    // setPreview(sortedPreviews);
  };

  const handleAddLayer = () => {
    const sorted = [...layers].sort((a, b) => a.order - b.order);
    const newLayer = {
      id: uniqId("layer-"),
      name: "",
      order:
        sorted && sorted.length > 0 ? sorted[sorted.length - 1].order + 1 : 1,
      collapsed: false,
    };
    setLayers((x) => [newLayer, ...x]);
  };

  const handleLayerNameChange = (e) => {
    const { value } = e.target;
    const id = e.target.getAttribute("id");

    const restLayers = layers.filter((x) => x.id !== id);
    const currentLayer = layers.filter((x) => x.id === id)[0];
    currentLayer.name = value;

    const newLayers = [...restLayers, currentLayer];
    const sortedLayers = newLayers.sort((a, b) => b.order - a.order);

    setLayers(sortedLayers);
  };

  const handleUploadImage = async ({
    imageURL,
    name,
    layerId,
    layerName,
    itemId,
  }) => {
    const newItem = {
      name: name.substr(0, name.lastIndexOf(".")),
      image: imageURL,
      rarity: "common",
      metadata: name.substr(0, name.lastIndexOf(".")),
      layerId: layerId,
      layerName: layerName,
      order: layers.filter((layer) => layer.id === layerId)[0].order,
      id: itemId ? itemId : uniqId("item-"),
    };

    setItems((x) => [...x, newItem]);
  };

  React.useEffect(() => {
    const totalItemsByLayer = {};
    let totalUniqImages = 1;

    for (const { layerId } of items) {
      if (!totalItemsByLayer[layerId]) totalItemsByLayer[layerId] = 0;
      totalItemsByLayer[layerId] += 1;
    }

    Object.entries(totalItemsByLayer).forEach(([_key, value]) => {
      totalUniqImages = totalUniqImages * Number(value);
    });

    // console.log("total uniq images: ", totalUniqImages);
  }, [preview]);

  return (
    <Root>
      <ContainerSM>
        <Workspace>
          {!address && <AuthorizeSection />}
          <Preview>
            <PreviewArea>
              {!preview ? (
                <PreviewInner>
                  <PreviewAreaText>No Preview Available</PreviewAreaText>
                </PreviewInner>
              ) : (
                <>
                  {preview.map(({ image }, index) => (
                    <PreviewImage key={`${image}-${index}`} src={image} />
                  ))}
                  <PreviewImageProtection />
                </>
              )}
            </PreviewArea>
            <PreviewFooter onClick={handleRandomizePreview}>
              Randomize
            </PreviewFooter>
          </Preview>
          <Tools>
            <Header>
              <HeaderTitle>Size 500x500</HeaderTitle>
              <Button size="small" onClick={handleProcessGenerating}>
                Generate Collection
              </Button>
            </Header>
            {layers.length === 0 && (
              <NoLayers>
                <NoLayersTitle>No Layers Added Yet</NoLayersTitle>
                <NoLayersText>
                  Start by adding a layer, for example background layer
                </NoLayersText>
                <NewLayerButton>
                  <Button startIcon="plus" onClick={handleAddLayer}>
                    Add Layer
                  </Button>
                </NewLayerButton>
              </NoLayers>
            )}
            {layers.length > 0 && (
              <NewLayerButton>
                <Button startIcon="plus" onClick={handleAddLayer}>
                  Add Layer
                </Button>
              </NewLayerButton>
            )}
            {layers.length > 0 &&
              layers.map((layer, index) => (
                <Layer key={layer.id}>
                  <LayerHeader>
                    <LayerHeaderTitle>Layer {layer.order}:</LayerHeaderTitle>
                    <TextField
                      width={144}
                      placeholder="Layer Name"
                      value={layer.name}
                      onChange={handleLayerNameChange}
                      id={layer.id}
                    />
                    {/* <LayerHeaderButton>...</LayerHeaderButton> */}
                    <LayerEditButtons>
                      <LayerEditButton
                        onClick={() => handleLayerDown(layer.id)}
                        disabled={index === layers.length - 1}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </LayerEditButton>
                      <LayerEditButton
                        onClick={() => handleLayerUp(layer.id)}
                        disabled={index === 0}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </LayerEditButton>
                      <LayerEditButton
                        onClick={() => handleLayerDelete(layer.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </LayerEditButton>
                      <LayerEditButton
                        onClick={() => handleLayerCollapse(layer.id)}
                      >
                        {layer.collapsed ? (
                          <FontAwesomeIcon icon={faSquarePlus} />
                        ) : (
                          <FontAwesomeIcon icon={faSquareMinus} />
                        )}
                      </LayerEditButton>
                    </LayerEditButtons>
                  </LayerHeader>
                  <LayerContent
                    style={{ display: layer.collapsed ? "none" : "block" }}
                  >
                    {items
                      .filter((item) => item.layerId === layer.id)
                      .map((item) => (
                        <LayerItem key={item.id}>
                          <LayerItemImage
                            image={item.image}
                            onClick={() =>
                              handleSelectItem({
                                id: item.id,
                                image: item.image,
                                layerId: item.layerId,
                              })
                            }
                            // selected={
                            //   preview &&
                            //   preview.filter((x) => x.id === item.id) &&
                            //   preview.filter((x) => x.id === item.id)[0]
                            // }
                          />
                          <LayerItemOptions>
                            <LayerItemOption>
                              <LayerItemTextField>
                                <TextField
                                  placeholder="Image Name"
                                  label="Image Name"
                                  value={item.name}
                                  id={item.id}
                                  name="name"
                                  onChange={handleItemChange}
                                />
                              </LayerItemTextField>
                            </LayerItemOption>
                            <LayerItemOption>
                              <LayerItemTextField>
                                <Select
                                  label="Rarity"
                                  value={item.rarity}
                                  onChange={handleRarityChange}
                                  id={item.id}
                                  options={[
                                    {
                                      value: "common",
                                      label: "Common",
                                    },
                                    {
                                      value: "uncommon",
                                      label: "Uncommon",
                                    },
                                    {
                                      value: "rare",
                                      label: "Rare",
                                    },
                                    {
                                      value: "superrare",
                                      label: "Super Rare",
                                    },
                                  ]}
                                />
                              </LayerItemTextField>
                            </LayerItemOption>
                            <LayerItemOption>
                              <LayerItemTextField>
                                <TextField
                                  placeholder="Metadata"
                                  value={item.metadata}
                                  id={item.id}
                                  width={96}
                                  name="metadata"
                                  onChange={handleItemChange}
                                />
                              </LayerItemTextField>
                            </LayerItemOption>
                          </LayerItemOptions>
                        </LayerItem>
                      ))}
                    <Upload
                      itemId={undefined}
                      layerId={layer.id}
                      layerName={layer.name}
                      onUpload={handleUploadImage}
                      address={address}
                    />
                  </LayerContent>
                </Layer>
              ))}
          </Tools>
        </Workspace>
      </ContainerSM>
    </Root>
  );
};

export default NewProject;

const Root = styled.div`
  padding-top: 58px;
  padding-bottom: 45px;
`;

const Workspace = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Preview = styled.div`
  position: sticky;
  top: 20px;
  width: 230px;
  border-radius: 10px;
  background: #ecf2fd;
  border: 1px solid #eaecee;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
`;

const PreviewImageProtection = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PreviewArea = styled.div`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

const PreviewInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const PreviewFooter = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  padding: 12px;
  background: #fd576c;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
`;

const PreviewAreaText = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const Tools = styled.div`
  width: 366px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: #ecf2fd;
  border: 1px solid #eaecee;
  padding: 10px 22px;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.div`
  font-weight: 700;
  color: #0e234b;
`;

const NewLayerButton = styled.div`
  text-align: center;
  margin-top: 35px;
`;

const NoLayersTitle = styled.div`
  text-align: center;
  font-weight: 700;
  color: #0e234b;
  font-size: 24px;
  margin-bottom: 16px;
`;

const NoLayersText = styled.div`
  text-align: center;
`;

const Layer = styled.div`
  border-radius: 10px;
  background: #ecf2fd;
  border: 1px solid #eaecee;
  padding: 32px 34px;
  margin-top: 30px;
  margin-left: -20px;
  margin-right: -10px;
`;

const NoLayers = styled(Layer)`
  padding: 38px 50px 40px;
`;

const LayerHeader = styled.div`
  display: flex;
  align-items: flex-start;
`;

const LayerHeaderTitle = styled.div`
  font-weight: 700;
  padding-top: 6px;
  padding-right: 15px;
  padding-left: 6px;
  white-space: nowrap;
`;

const LayerHeaderButton = styled.div`
  width: 27px;
  height: 27px;
  text-align: center;
  transform: rotate(90deg);
  font-size: 17px;
  font-weight: 700;
  margin-left: 10px;
  cursor: pointer;
`;

const LayerContent = styled.div`
  padding-top: 26px;
`;

const LayerItem = styled.div`
  display: flex;
  /* margin-bottom: 28px; */
  margin-bottom: 26px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LayerItemImage = styled.div<{ image: string; selected?: boolean }>`
  flex: 0 0 130px;
  width: 130px;
  height: 130px;
  margin-right: 22px;
  border-radius: 6px;
  background: url(${({ image }) => image}) no-repeat 50%,
    url(/images/png-grid.jpg) no-repeat 0 0;
  background-size: cover, cover;
  border: 1px solid ${({ selected }) => (selected ? "#0E234B" : "#ffffff")};
`;

const LayerItemOptions = styled.div``;

const LayerItemOption = styled.div`
  /* margin-bottom: 10px; */
  margin-bottom: 9px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LayerItemTextField = styled.div`
  width: 144px;
`;

const LayerEditButtons = styled.div`
  display: flex;
  margin-left: auto;
`;

const LayerEditButton = styled.div<{ disabled?: boolean }>`
  width: 27px;
  height: 27px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  opacity: 0.4;
  ${({ disabled }) =>
    !disabled &&
    css`
      opacity: 1;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `}
`;

const AuthorizeSection = styled(Layer)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  opacity: 0.9;
  font-size: 22px;
  font-weight: 700;
`;
