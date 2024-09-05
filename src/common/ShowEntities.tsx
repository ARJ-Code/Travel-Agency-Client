import { ReactNode } from "react";
import { Avatar, Card, Divider, Flex, Image, List } from "antd";
import logo from "../assets/logo.jpg";
import { Image as ApiImage } from "../types/api";
import { useMediaQuery } from "react-responsive";
import Title from "antd/es/typography/Title";

export interface ShowEntitiesProps<T> {
  data: T[];
  loading: boolean;
  actions?: (value: T) => ReactNode[];
  content: (value: T) => ReactNode;
  convert: (value: T) => {
    avatar?: ReactNode;
    title?: string;
    description?: ReactNode;
    image: ApiImage;
    footerImage?: ReactNode;
  };
}

function ShowEntities<T>({
  data,
  actions,
  content,
  convert,
  loading,
}: ShowEntitiesProps<T>) {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div
      style={{
        margin: isSmallScreen ? -10 : 40,
      }}
    >
      <List
        loading={loading}
        itemLayout="vertical"
        size="small"
        dataSource={data}
        renderItem={(item, idx) => {
          const entity = convert(item);
          return (
            <Card
              bodyStyle={{ padding: isSmallScreen ? 10 : undefined }}
              hoverable
              key={idx}
              style={{
                marginBottom: isSmallScreen ? 10 : 50,
                padding: isSmallScreen ? 0 : undefined,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <div>
                      {entity.avatar ? (
                        entity.avatar
                      ) : (
                        <Avatar
                          size={isSmallScreen ? 30 : 40}
                          src={logo}
                          style={{ borderRadius: isSmallScreen ? 5 : 10 }}
                        />
                      )}
                    </div>
                    <div>
                      <Title
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      >
                        {entity.title}
                      </Title>
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    {content ? content(item) : undefined}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {actions
                      ? actions(item).map((a) => (
                          <>
                            {a}
                            <Divider
                              type="vertical"
                              style={{
                                height: "80%",
                                // marginTop: 5,
                                // marginBottom: 5,
                              }}
                            />
                          </>
                        ))
                      : undefined}
                  </div>
                </div>
                <div style={{ width: "20%" }}>
                  <Image
                    preview={false}
                    className="show-mini-image"
                    alt={entity.image.name}
                    src={entity.image.url}
                    style={{
                      maxWidth: "100%", // Limita la imagen al 100% del contenedor
                      maxHeight: "100%", // Limita la altura al 100% del contenedor
                      objectFit: "cover", // La imagen cubre completamente el contenedor
                      borderRadius: isSmallScreen ? 5 : 10,
                    }}
                  />

                  {entity.footerImage && (
                    <div
                      className="center-content mt-5"
                      style={{
                        marginTop: isSmallScreen ? 5 : 10,
                      }}
                    >
                      {entity.footerImage}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
}

export default ShowEntities;
