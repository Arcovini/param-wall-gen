import { useState } from "react";
import { ColumnScene } from "./components/ColumnScene";
import { WallScene, type WallPresetChoice } from "./components/WallScene";
import { SlabScene, type SlabDemoKey } from "./components/SlabScene";
import "./App.css";

type PresetType =
  | "single-20x20"
  | "single-30x30"
  | "mixed"
  | "custom"
  | "minimal";
type ElementType = "column" | "wall" | "slab";

function App() {
  const [elementType, setElementType] = useState<ElementType>("column");
  const [presetType, setPresetType] = useState<PresetType>("single-20x20");
  const [wallPresetChoice, setWallPresetChoice] =
    useState<WallPresetChoice>("ceramic");
  const [key, setKey] = useState(0);
  const [slabDemoKey, setSlabDemoKey] = useState<SlabDemoKey>("ifc-tqs-floor");

  const handlePresetChange = (type: PresetType) => {
    setPresetType(type);
    setKey((prev) => prev + 1);
  };

  const handleWallPresetChange = (choice: WallPresetChoice) => {
    setWallPresetChoice(choice);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "rgba(26, 26, 26, 0.95)",
          padding: "20px",
          borderRadius: "8px",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          minWidth: "280px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
          Syncker Lib v2 - Demo
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <strong>Tipo de Elemento:</strong>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={() => {
              setElementType("column");
              setKey((prev) => prev + 1);
            }}
            style={{
              padding: "10px 16px",
              background: elementType === "column" ? "#9d4b4b" : "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: "1 1 80px",
            }}
          >
            Coluna
          </button>
          <button
            onClick={() => {
              setElementType("wall");
              setKey((prev) => prev + 1);
            }}
            style={{
              padding: "10px 16px",
              background: elementType === "wall" ? "#9d4b4b" : "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: "1 1 80px",
            }}
          >
            Parede
          </button>
          <button
            type="button"
            onClick={() => {
              setElementType("slab");
              setKey((prev) => prev + 1);
            }}
            style={{
              padding: "10px 16px",
              background: elementType === "slab" ? "#9d4b4b" : "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: "1 1 80px",
            }}
          >
            Piso (SlabFloor)
          </button>
        </div>

        {elementType !== "slab" && (
          <div style={{ marginBottom: "15px" }}>
            <strong>
              {elementType === "column"
                ? "Preset da coluna:"
                : "Preset da parede:"}
            </strong>
          </div>
        )}

        {elementType === "column" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              onClick={() => handlePresetChange("single-20x20")}
              style={{
                padding: "12px",
                background: presetType === "single-20x20" ? "#9d4b4b" : "#333",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (presetType !== "single-20x20") {
                  e.currentTarget.style.background = "#444";
                }
              }}
              onMouseLeave={(e) => {
                if (presetType !== "single-20x20") {
                  e.currentTarget.style.background = "#333";
                }
              }}
            >
              <div style={{ fontWeight: "bold" }}>Preset Único 20x20</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                C25, dimensões com Gaussian
              </div>
            </button>

            <button
              onClick={() => handlePresetChange("single-30x30")}
              style={{
                padding: "12px",
                background: presetType === "single-30x30" ? "#9d4b4b" : "#333",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (presetType !== "single-30x30") {
                  e.currentTarget.style.background = "#444";
                }
              }}
              onMouseLeave={(e) => {
                if (presetType !== "single-30x30") {
                  e.currentTarget.style.background = "#333";
                }
              }}
            >
              <div style={{ fontWeight: "bold" }}>Preset Único 30x30</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                C30, dimensões com Gaussian
              </div>
            </button>

            <button
              onClick={() => handlePresetChange("mixed")}
              style={{
                padding: "12px",
                background: presetType === "mixed" ? "#9d4b4b" : "#333",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (presetType !== "mixed") {
                  e.currentTarget.style.background = "#444";
                }
              }}
              onMouseLeave={(e) => {
                if (presetType !== "mixed") {
                  e.currentTarget.style.background = "#333";
                }
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                Preset Misto (Bias Interno)
              </div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                70% 20x20 + 30% 30x30
              </div>
            </button>

            <button
              onClick={() => handlePresetChange("custom")}
              style={{
                padding: "12px",
                background: presetType === "custom" ? "#9d4b4b" : "#333",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (presetType !== "custom") {
                  e.currentTarget.style.background = "#444";
                }
              }}
              onMouseLeave={(e) => {
                if (presetType !== "custom") {
                  e.currentTarget.style.background = "#333";
                }
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                Array com Bias Customizado
              </div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                30% 30x30 + 70% 20x20
              </div>
            </button>

            <button
              onClick={() => handlePresetChange("minimal")}
              style={{
                padding: "12px",
                background: presetType === "minimal" ? "#9d4b4b" : "#333",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                if (presetType !== "minimal") {
                  e.currentTarget.style.background = "#444";
                }
              }}
              onMouseLeave={(e) => {
                if (presetType !== "minimal") {
                  e.currentTarget.style.background = "#333";
                }
              }}
            >
              <div style={{ fontWeight: "bold" }}>Preset Mínimo (Sem Cor)</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                Testa tratamento de campos opcionais
              </div>
            </button>
          </div>
        ) : elementType === "wall" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              type="button"
              onClick={() => handleWallPresetChange("ceramic")}
              style={{
                padding: "12px",
                background: wallPresetChoice === "ceramic" ? "#9d4b4b" : "#333",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Cerâmica</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                Bloco cerâmico padrão
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleWallPresetChange("concrete")}
              style={{
                padding: "12px",
                background:
                  wallPresetChoice === "concrete" ? "#9d4b4b" : "#333",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Bloco de concreto</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                Alvenaria estrutural
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleWallPresetChange("face-brick")}
              style={{
                padding: "12px",
                background:
                  wallPresetChoice === "face-brick" ? "#9d4b4b" : "#333",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Tijolo aparente</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                Parede de face
              </div>
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "13px",
              lineHeight: 1.5,
              opacity: 0.95,
            }}
          >
            <label
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <span>
                Exemplo de <code style={{ fontSize: "12px" }}>profile2d</code> e
                aberturas
              </span>
              <select
                value={slabDemoKey}
                onChange={(e) => setSlabDemoKey(e.target.value as SlabDemoKey)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  background: "#333",
                  color: "white",
                  border: "1px solid #555",
                  fontSize: "13px",
                }}
              >
                <option value="rect-plain">Retângulo (sem furos)</option>
                <option value="rect-central-hole">
                  Retângulo + furo central
                </option>
                <option value="rect-two-holes">Retângulo + dois furos</option>
                <option value="l-shape">Perfil em L (sem furos)</option>
                <option value="hex-with-hole">
                  Hexágono + furo triangular
                </option>
                <option value="ifc-tqs-floor">
                  IFC — Piso TQS h=14 (perfil real)
                </option>
              </select>
            </label>
            <p style={{ margin: 0, fontSize: "12px", opacity: 0.85 }}>
              API: <code style={{ fontSize: "11px" }}>SLAB_FLOOR_STANDARD_TYPE</code>
              , <code style={{ fontSize: "11px" }}>SlabFloorThreeJsBuilder</code>
              . Aberturas:{" "}
              <code style={{ fontSize: "11px" }}>Vec2[][]</code> (um contorno
              fechado por buraco) — buracos no plano do perfil; malha com
              triangulação + laterais internas.
            </p>
          </div>
        )}

        <div style={{ marginTop: "15px", fontSize: "12px", opacity: 0.7 }}>
          {elementType === "column" ? (
            <>
              <div>🎲 Cada coluna tem variações aleatórias</div>
              <div>📐 Dimensões: Gaussian (sigma + clamp)</div>
              <div>🎨 Roughness: Gaussian (0.8 ± 0.05)</div>
              <div>🖼️ Texturas PBR: Albedo + Normal + Roughness + AO</div>
              <div>🎯 20x20: 2 texturas com bias (60% liso / 40% rugoso)</div>
              <div>🎯 30x30: 1 textura rugosa (repeat variável)</div>
            </>
          ) : elementType === "wall" ? (
            <>
              <div>🧱 Parede com blocos individuais</div>
              <div>🎲 Cores procedurais com variação Gaussian</div>
              <div>🔗 Juntas horizontais e verticais</div>
              <div>🏗️ Padrão de amarração (stagger)</div>
              <div>🚪 Suporte a aberturas com vergas</div>
            </>
          ) : (
            <>
              <div>
                📦 SlabFloor: <code style={{ fontSize: "11px" }}>profile2d</code>{" "}
                + <code style={{ fontSize: "11px" }}>openings</code> opcionais
              </div>
              <div>
                📐 Topo · base · laterais: partes distintas no preset
              </div>
            </>
          )}
          <div>🖱️ Arraste para rotacionar</div>
          <div>🔍 Scroll para zoom</div>
        </div>
      </div>

      {elementType === "column" ? (
        <ColumnScene key={key} presetType={presetType} />
      ) : elementType === "wall" ? (
        <WallScene key={key} wallPresetChoice={wallPresetChoice} />
      ) : (
        <SlabScene key={key} demoKey={slabDemoKey} />
      )}
    </div>
  );
}

export default App;
